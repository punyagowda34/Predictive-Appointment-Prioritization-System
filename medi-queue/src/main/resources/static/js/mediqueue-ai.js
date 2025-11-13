// AI-Powered MediQueue Frontend
class MediQueueAI {
    constructor() {
        this.symptomPatterns = {
            'chest pain': { condition: 'Cardiac Concern', urgency: 'HIGH', confidence: 85 },
            'difficulty breathing': { condition: 'Respiratory Issue', urgency: 'HIGH', confidence: 80 },
            'fever cough': { condition: 'Respiratory Infection', urgency: 'MEDIUM', confidence: 75 },
            'headache dizziness': { condition: 'Neurological/Migraine', urgency: 'MEDIUM', confidence: 70 },
            'stomach pain vomiting': { condition: 'Gastrointestinal', urgency: 'MEDIUM', confidence: 65 },
            'rash itching': { condition: 'Dermatological', urgency: 'LOW', confidence: 60 }
        };
        
        this.init();
    }

    init() {
        this.setupAIFeatures();
        this.loadSmartQueue();
        this.startAIMonitoring();
    }

    setupAIFeatures() {
        // Real-time symptom analysis
        document.getElementById('symptoms').addEventListener('input', (e) => {
            this.analyzeSymptoms(e.target.value);
        });

        // Smart form interactions
        document.querySelectorAll('#smartAppointmentForm input, #smartAppointmentForm select').forEach(element => {
            element.addEventListener('change', () => this.calculateAIPriority());
        });

        // AI optimization
        document.getElementById('aiOptimize').addEventListener('click', () => {
            this.optimizeQueueWithAI();
        });

        // Auto-refresh
        document.getElementById('refreshQueue').addEventListener('click', () => {
            this.loadSmartQueue();
        });

        // Form submission
        document.getElementById('smartAppointmentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.bookSmartAppointment();
        });
    }

    analyzeSymptoms(symptomText) {
        if (symptomText.length < 3) {
            document.getElementById('aiAnalysis').style.display = 'none';
            return;
        }

        let bestMatch = null;
        let highestConfidence = 0;

        // AI pattern matching
        for (const [pattern, data] of Object.entries(this.symptomPatterns)) {
            if (symptomText.toLowerCase().includes(pattern)) {
                if (data.confidence > highestConfidence) {
                    bestMatch = data;
                    highestConfidence = data.confidence;
                }
            }
        }

        if (bestMatch) {
            this.showAIAnalysis(bestMatch);
            this.updateUrgencyRecommendation(bestMatch.urgency);
        } else {
            this.showAIAnalysis({
                condition: 'General Consultation Recommended',
                urgency: 'LOW',
                confidence: 50
            });
        }

        this.calculateAIPriority();
    }

    showAIAnalysis(analysis) {
        const aiAnalysis = document.getElementById('aiAnalysis');
        const conditionElement = document.getElementById('detectedCondition');
        const confidenceBadge = document.getElementById('confidenceBadge');

        conditionElement.textContent = analysis.condition;
        confidenceBadge.textContent = `${analysis.confidence}% confident`;
        confidenceBadge.className = `badge ${
            analysis.confidence > 75 ? 'bg-success' : 
            analysis.confidence > 60 ? 'bg-warning' : 'bg-secondary'
        }`;

        aiAnalysis.style.display = 'block';
    }

    updateUrgencyRecommendation(urgency) {
        document.getElementById(`urgency${urgency.charAt(0) + urgency.slice(1).toLowerCase()}`).checked = true;
    }

    calculateAIPriority() {
        let score = 0;
        const factors = [];

        // Age scoring
        const age = parseInt(document.getElementById('patientAge').value) || 0;
        if (age > 60) {
            score += 20;
            factors.push('Senior (+20)');
        } else if (age < 10 && age > 0) {
            score += 10;
            factors.push('Child (+10)');
        }

        // Emergency flag
        const isEmergency = document.getElementById('isEmergency').checked;
        if (isEmergency) {
            score += 50;
            factors.push('Emergency (+50)');
        }

        // Chronic conditions
        const hasChronic = document.getElementById('hasChronicDisease').checked;
        if (hasChronic) {
            score += 15;
            factors.push('Chronic (+15)');
        }

        // Urgency level
        const urgency = document.querySelector('input[name="urgencyLevel"]:checked').value;
        switch (urgency) {
            case 'HIGH': score += 30; factors.push('High Urgency (+30)'); break;
            case 'MEDIUM': score += 15; factors.push('Medium Urgency (+15)'); break;
            case 'LOW': score += 5; factors.push('Low Urgency (+5)'); break;
        }

        // New patient bonus
        score += 10;
        factors.push('New Patient (+10)');

        // Update UI
        this.updatePriorityDisplay(score, factors);
    }

    updatePriorityDisplay(score, factors) {
        const preview = document.getElementById('smartPriorityPreview');
        const scoreElement = document.getElementById('aiPriorityScore');
        const breakdownElement = document.getElementById('priorityBreakdown');
        const progressBar = document.querySelector('#priorityMeter .progress-bar');

        scoreElement.textContent = score;
        breakdownElement.textContent = factors.join(' • ');
        
        // Animated progress bar
        const percentage = Math.min(100, (score / 100) * 100);
        progressBar.style.width = `${percentage}%`;
        progressBar.className = `progress-bar ${
            score >= 50 ? 'bg-danger' : 
            score >= 30 ? 'bg-warning' : 'bg-success'
        }`;

        preview.style.display = 'block';
    }

    async loadSmartQueue() {
        try {
            // Show AI loading state
            document.getElementById('smartQueue').innerHTML = `
                <div class="text-center text-muted py-4">
                    <div class="spinner-border text-primary mb-3" role="status">
                        <span class="visually-hidden">AI is analyzing...</span>
                    </div>
                    <p><i class="fas fa-robot me-2"></i>AI is optimizing queue...</p>
                </div>
            `;

            // Simulate API call
            const response = await this.fetchQueueData();
            this.renderSmartQueue(response);
            this.updateAIDashboard(response);
            this.generateAIRecommendations(response);

        } catch (error) {
            console.error('AI Queue Error:', error);
        }
    }

    async fetchQueueData() {
        // Simulate API response with AI-enhanced data
        return {
            appointments: [
                {
                    id: 1, patient: { name: 'John Doe', age: 45 }, 
                    symptoms: 'Chest pain and shortness of breath',
                    priorityScore: 85, urgency: 'HIGH', isEmergency: true,
                    waitTime: 15, doctor: 'Dr. Smith',
                    aiNotes: '🚨 Cardiac concern detected'
                },
                {
                    id: 2, patient: { name: 'Jane Smith', age: 68 }, 
                    symptoms: 'Diabetes followup',
                    priorityScore: 45, urgency: 'MEDIUM', isEmergency: false,
                    waitTime: 45, doctor: 'Dr. Johnson',
                    aiNotes: '👴 Senior with chronic condition'
                }
            ],
            stats: {
                total: 8, emergency: 2, avgWait: 32, aiEfficiency: 95
            }
        };
    }

    renderSmartQueue(data) {
        const queueContainer = document.getElementById('smartQueue');
        
        if (!data.appointments.length) {
            queueContainer.innerHTML = `
                <div class="text-center text-muted py-5">
                    <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
                    <p>No appointments in queue. AI is monitoring for new patients.</p>
                </div>
            `;
            return;
        }

        const queueHTML = data.appointments.map(appt => `
            <div class="card queue-item mb-3 priority-${appt.priorityScore >= 50 ? 'high' : appt.priorityScore >= 30 ? 'medium' : 'low'}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <div class="d-flex align-items-center mb-2">
                                <h6 class="mb-0 me-3">${appt.patient.name}</h6>
                                <span class="badge ${appt.isEmergency ? 'bg-danger' : 'bg-secondary'}">
                                    ${appt.isEmergency ? '🚨 EMERGENCY' : appt.urgency}
                                </span>
                            </div>
                            <p class="text-muted small mb-1">
                                <i class="fas fa-user me-1"></i>${appt.patient.age} yrs • 
                                <i class="fas fa-user-md me-1"></i>${appt.doctor}
                            </p>
                            <p class="small mb-1"><strong>Symptoms:</strong> ${appt.symptoms}</p>
                            <div class="ai-insight small">
                                <i class="fas fa-robot me-1"></i>${appt.aiNotes}
                            </div>
                        </div>
                        <div class="col-md-4 text-end">
                            <div class="mb-2">
                                <span class="badge bg-primary fs-6">${appt.priorityScore}</span>
                                <small class="text-muted d-block">AI Score</small>
                            </div>
                            <div class="mb-2">
                                <i class="fas fa-clock me-1"></i>
                                <strong>${appt.waitTime}m</strong>
                                <small class="text-muted d-block">Wait Time</small>
                            </div>
                            <button class="btn btn-sm btn-outline-primary" onclick="mediQueueAI.startAppointment(${appt.id})">
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        queueContainer.innerHTML = queueHTML;
    }

    updateAIDashboard(data) {
        document.getElementById('totalPatients').textContent = data.stats.total;
        document.getElementById('emergencyCount').textContent = data.stats.emergency;
        document.getElementById('avgWaitTime').textContent = data.stats.avgWait + 'm';
        document.getElementById('aiEfficiency').textContent = data.stats.aiEfficiency + '%';

        this.updatePriorityChart(data.appointments);
    }

    updatePriorityChart(appointments) {
        const ctx = document.getElementById('priorityChart').getContext('2d');
        
        const priorityCounts = {
            high: appointments.filter(a => a.priorityScore >= 50).length,
            medium: appointments.filter(a => a.priorityScore >= 30 && a.priorityScore < 50).length,
            low: appointments.filter(a => a.priorityScore < 30).length
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['High Priority', 'Medium Priority', 'Low Priority'],
                datasets: [{
                    data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
                    backgroundColor: ['#e74c3c', '#f39c12', '#27ae60'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    title: { display: true, text: 'AI Priority Distribution' }
                }
            }
        });
    }

    generateAIRecommendations(data) {
        const recommendations = [];
        
        if (data.stats.emergency > 2) {
            recommendations.push('🚨 High emergency cases - consider activating rapid response team');
        }
        
        if (data.stats.avgWait > 45) {
            recommendations.push('⏰ Long wait times - suggest allocating additional doctors');
        }
        
        const highPriorityCount = data.appointments.filter(a => a.priorityScore >= 50).length;
        if (highPriorityCount > 3) {
            recommendations.push('🔴 Multiple high-priority cases - optimize doctor assignments');
        }

        if (recommendations.length > 0) {
            document.getElementById('recommendationsList').innerHTML = 
                recommendations.map(rec => `<div class="mb-1">• ${rec}</div>`).join('');
            document.getElementById('aiRecommendations').style.display = 'block';
        }
    }

    optimizeQueueWithAI() {
        // Show AI optimization in progress
        const queue = document.getElementById('smartQueue');
        queue.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-warning mb-3" role="status"></div>
                <p><i class="fas fa-magic me-2"></i>AI is re-optimizing queue...</p>
            </div>
        `;

        // Simulate AI optimization
        setTimeout(() => {
            this.loadSmartQueue();
            this.showAIModal('Queue optimized! AI has rearranged patients based on urgency and predicted consultation times.');
        }, 1500);
    }

    showAIModal(message) {
        document.getElementById('aiModalContent').innerHTML = `
            <div class="text-center">
                <i class="fas fa-robot fa-3x text-primary mb-3"></i>
                <p>${message}</p>
            </div>
        `;
        new bootstrap.Modal(document.getElementById('aiModal')).show();
    }

    startAIMonitoring() {
        // Simulate real-time AI monitoring
        setInterval(() => {
            this.simulateRealTimeUpdates();
        }, 30000); // Every 30 seconds
    }

    simulateRealTimeUpdates() {
        // Simulate new emergency case
        if (Math.random() < 0.3) { // 30% chance
            this.showAIModal('🚨 AI Alert: New emergency case detected in the queue!');
            this.loadSmartQueue();
        }
    }

    async bookSmartAppointment() {
        const bookBtn = document.getElementById('smartBookBtn');
        const originalText = bookBtn.innerHTML;
        
        bookBtn.innerHTML = '<i class="fas fa-robot me-2"></i>AI is booking...';
        bookBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showAIModal(`
                <div class="text-center">
                    <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
                    <h5>Appointment Booked Successfully!</h5>
                    <p>AI has optimized your position in the queue based on medical urgency.</p>
                    <div class="alert alert-success mt-3">
                        <strong>AI Priority Score:</strong> <span id="finalPriorityScore">85</span><br>
                        <strong>Estimated Wait:</strong> <span id="finalWaitTime">15 minutes</span><br>
                        <strong>Queue Position:</strong> <span id="queuePosition">2nd</span>
                    </div>
                </div>
            `);

            // Reset form
            document.getElementById('smartAppointmentForm').reset();
            document.getElementById('smartPriorityPreview').style.display = 'none';
            document.getElementById('aiAnalysis').style.display = 'none';

            // Refresh queue
            this.loadSmartQueue();

        } catch (error) {
            this.showAIModal('❌ AI encountered an error. Please try again.');
        } finally {
            bookBtn.innerHTML = originalText;
            bookBtn.disabled = false;
        }
    }

    startAppointment(appointmentId) {
        this.showAIModal(`Starting appointment #${appointmentId}. AI is preparing patient notes...`);
        // Implementation for starting appointment
    }
}

// Initialize AI System
const mediQueueAI = new MediQueueAI();