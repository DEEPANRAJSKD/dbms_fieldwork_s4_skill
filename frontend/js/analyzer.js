// Skill Analyzer - Complete Working Assessment System
class SkillAssessment {
    constructor() {
        this.selectedCategories = [];
        this.selectedSkills = {};
        this.currentStep = 1;
        this.init();
    }

    init() {
        console.log('Assessment initialized');
        this.setupEventListeners();
        this.clearAssessmentState(); // Clear state on fresh start
        this.loadSavedState();
    }

    clearAssessmentState() {
        // Clear any saved state to start fresh
        localStorage.removeItem('currentAssessment');
        this.selectedCategories = [];
        this.selectedSkills = {};
        this.currentStep = 1;
        
        // Clear UI selections
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('selected');
            const checkbox = card.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = false;
            }
        });
        
        // Clear skill ratings
        document.querySelectorAll('.skill-rating input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Reset to step 1
        this.showStep(1);
        this.updateProgressBar(25);
        this.updateContinueButton();
        
        console.log('Assessment state cleared');
    }

    setupEventListeners() {
        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const checkbox = card.querySelector('input[type="checkbox"]');
                if (!e.target.matches('input[type="checkbox"]')) {
                    checkbox.checked = !checkbox.checked;
                }
                this.handleCategorySelection(card, checkbox);
            });
        });

        // Continue to Skills button
        const continueBtn = document.getElementById('continueToSkills');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.goToStep2());
        }

        // Back to Categories button
        const backBtn = document.getElementById('backToCategories');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.goToStep1());
        }

        // Continue to Results button
        const resultsBtn = document.getElementById('continueToResults');
        if (resultsBtn) {
            resultsBtn.addEventListener('click', () => this.goToStep3());
        }
    }

    handleCategorySelection(card, checkbox) {
        const category = card.dataset.category;
        
        if (checkbox.checked) {
            this.selectedCategories.push(category);
            card.classList.add('selected');
        } else {
            this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
            card.classList.remove('selected');
        }

        this.updateContinueButton();
    }

    updateContinueButton() {
        const continueBtn = document.getElementById('continueToSkills');
        if (continueBtn) {
            continueBtn.disabled = this.selectedCategories.length === 0;
        }
    }

    goToStep1() {
        this.currentStep = 1;
        this.showStep(1);
        this.updateProgressBar(25);
    }

    goToStep2() {
        if (this.selectedCategories.length === 0) {
            this.showNotification('Please select at least one category', 'warning');
            return;
        }

        this.currentStep = 2;
        this.loadSkills();
        this.showStep(2);
        this.updateProgressBar(50);
    }

    goToStep3() {
        if (!this.validateSkillRatings()) {
            this.showNotification('Please rate all skills', 'warning');
            return;
        }

        this.currentStep = 3;
        this.displayResults();
        this.showStep(3);
        this.updateProgressBar(100);
        this.saveAssessment();
    }

    showStep(stepNumber) {
        document.querySelectorAll('.assessment-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const targetStep = document.getElementById(`step${stepNumber}`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }

    updateProgressBar(percentage) {
        const progressBar = document.getElementById('assessmentProgress');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }

    loadSkills() {
        const container = document.getElementById('skillsContainer');
        if (!container) return;

        let html = '<div class="row g-4">';
        
        // Add bulk selection buttons
        html += `
            <div class="col-12 mb-4">
                <div class="card border-0 shadow-sm quick-selection-card">
                    <div class="card-body">
                        <h6 class="card-title mb-3">Quick Rating Selection</h6>
                        <div class="btn-group w-100" role="group">
                            <button type="button" class="btn btn-outline-primary" onclick="setAllSkillsRating('beginner')">
                                <i class="fas fa-star me-1"></i>Set All as Beginner
                            </button>
                            <button type="button" class="btn btn-outline-success" onclick="setAllSkillsRating('intermediate')">
                                <i class="fas fa-star-half-alt me-1"></i>Set All as Intermediate
                            </button>
                            <button type="button" class="btn btn-outline-warning" onclick="setAllSkillsRating('expert')">
                                <i class="fas fa-trophy me-1"></i>Set All as Expert
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.selectedCategories.forEach(category => {
            const skills = window.skillsDatabase[category];
            if (skills) {
                skills.forEach(skill => {
                    html += `
                        <div class="col-md-6">
                            <div class="skill-rating-card card border-0 shadow-sm">
                                <div class="card-body">
                                    <h6 class="card-title">${skill.name}</h6>
                                    <p class="text-muted small">${skill.description}</p>
                                    <div class="skill-rating">
                                        <div class="btn-group w-100" role="group">
                                            <input type="radio" class="btn-check" name="skill_${skill.id}" id="${skill.id}_beginner" value="beginner">
                                            <label class="btn btn-outline-primary" for="${skill.id}_beginner">Beginner</label>
                                            
                                            <input type="radio" class="btn-check" name="skill_${skill.id}" id="${skill.id}_intermediate" value="intermediate">
                                            <label class="btn btn-outline-success" for="${skill.id}_intermediate">Intermediate</label>
                                            
                                            <input type="radio" class="btn-check" name="skill_${skill.id}" id="${skill.id}_expert" value="expert">
                                            <label class="btn btn-outline-warning" for="${skill.id}_expert">Expert</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
        });

        html += '</div>';
        container.innerHTML = html;

        // Add event listeners for skill ratings
        this.setupSkillRatingListeners();
    }

    setupSkillRatingListeners() {
        document.querySelectorAll('.skill-rating input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const skillId = e.target.name.replace('skill_', '');
                const rating = e.target.value;
                
                // Convert descriptive rating to numeric for calculations
                const ratingMap = {
                    'beginner': 1,
                    'intermediate': 3,
                    'expert': 5
                };
                
                this.selectedSkills[skillId] = {
                    id: skillId,
                    rating: ratingMap[rating] || 1,
                    userLevel: rating
                };
                this.saveCurrentState();
            });
        });
    }

    validateSkillRatings() {
        let allRated = true;
        
        this.selectedCategories.forEach(category => {
            const skills = window.skillsDatabase[category];
            if (skills) {
                skills.forEach(skill => {
                    const radio = document.querySelector(`input[name="skill_${skill.id}"]:checked`);
                    if (!radio) {
                        allRated = false;
                    }
                });
            }
        });

        return allRated;
    }

    displayResults() {
        const container = document.getElementById('resultsContainer');
        if (!container) return;

        let html = '<div class="row">';
        
        // Add responsive chart first
        html += this.generateResponsiveChart();
        
        Object.values(this.selectedSkills).forEach(skill => {
            const skillData = this.findSkillById(skill.id);
            if (skillData) {
                const level = this.getSkillLevel(skill.rating * 20);
                const levelColor = this.getSkillLevelColor(skill.rating * 20);
                
                html += `
                    <div class="col-md-6 mb-3">
                        <div class="skill-result-card card border-0 shadow-sm">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h6 class="card-title mb-0">${skillData.name}</h6>
                                    <span class="badge bg-${levelColor}">${level}</span>
                                </div>
                                <div class="progress mb-2">
                                    <div class="progress-bar" style="width: ${(skill.rating / 5) * 100}%"></div>
                                </div>
                                <p class="text-muted small mb-3">Current Level: ${skill.rating}/5</p>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-sm btn-primary knowledge-button" data-skill-id="${skill.id}">
                                        <i class="fas fa-graduation-cap me-1"></i>Learn
                                    </button>
                                    <button class="btn btn-sm btn-success" onclick="showLearningPath('${skill.id}')">
                                        <i class="fas fa-chart-line me-1"></i>Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        html += '</div>';
        container.innerHTML = html;

        // Setup knowledge buttons
        this.setupKnowledgeButtons();
        
        // Initialize the responsive chart
        this.initializeResponsiveChart();
    }

    generateResponsiveChart() {
        const chartData = this.prepareResponsiveChartData();
        return `
            <div class="col-12 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Your Skill Assessment Results</h5>
                        <div class="chart-container" style="height: 300px; max-height: 300px;">
                            <canvas id="assessmentChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    prepareResponsiveChartData() {
        const categoryData = {};
        const skillData = [];
        
        // Group skills by category and calculate averages
        this.selectedCategories.forEach(category => {
            const skills = window.skillsDatabase[category];
            if (skills) {
                let totalRating = 0;
                let skillCount = 0;
                
                skills.forEach(skill => {
                    if (this.selectedSkills[skill.id]) {
                        totalRating += this.selectedSkills[skill.id].rating;
                        skillCount++;
                        
                        skillData.push({
                            name: skill.name,
                            rating: this.selectedSkills[skill.id].rating,
                            category: category
                        });
                    }
                });
                
                if (skillCount > 0) {
                    categoryData[category] = {
                        average: (totalRating / skillCount) * 20, // Convert to percentage
                        skillCount: skillCount
                    };
                }
            }
        });

        return {
            categories: categoryData,
            skills: skillData
        };
    }

    initializeResponsiveChart() {
        const ctx = document.getElementById('assessmentChart');
        if (!ctx) return;

        const chartData = this.prepareResponsiveChartData();
        
        // Create labels based on selected categories
        const labels = [];
        const data = [];
        const colors = {
            technical: 'rgba(54, 162, 235, 0.2)',
            design: 'rgba(75, 192, 192, 0.2)',
            business: 'rgba(255, 206, 86, 0.2)',
            soft: 'rgba(153, 102, 255, 0.2)'
        };
        const borderColors = {
            technical: 'rgba(54, 162, 235, 1)',
            design: 'rgba(75, 192, 192, 1)',
            business: 'rgba(255, 206, 86, 1)',
            soft: 'rgba(153, 102, 255, 1)'
        };

        Object.keys(chartData.categories).forEach(category => {
            const categoryNames = {
                technical: 'Technical Skills',
                design: 'Design Skills',
                business: 'Business Skills',
                soft: 'Soft Skills'
            };
            
            labels.push(categoryNames[category]);
            data.push(chartData.categories[category].average);
        });

        // Destroy existing chart if it exists
        if (this.assessmentChart) {
            this.assessmentChart.destroy();
        }

        this.assessmentChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Your Skill Level',
                    data: data,
                    backgroundColor: colors[this.selectedCategories[0]] || 'rgba(54, 162, 235, 0.2)',
                    borderColor: borderColors[this.selectedCategories[0]] || 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: borderColors[this.selectedCategories[0]] || 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: borderColors[this.selectedCategories[0]] || 'rgba(54, 162, 235, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 12
                            }
                        },
                        pointLabels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + Math.round(context.parsed.r) + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }

    setupKnowledgeButtons() {
        document.querySelectorAll('.knowledge-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const skillId = e.target.dataset.skillId;
                this.openLearningModule(skillId);
            });
        });
    }

    openLearningModule(skillId) {
        const skill = this.findSkillById(skillId);
        if (!skill) return;

        const modal = new bootstrap.Modal(document.getElementById('learningModal'));
        const modalBody = document.getElementById('learningContent');
        
        modalBody.innerHTML = `
            <div class="learning-module">
                <h4 class="mb-4">
                    <i class="fas fa-graduation-cap text-primary me-2"></i>
                    ${skill.name} Learning Path
                </h4>
                
                <div class="learning-content">
                    ${skill.resources.map((resource, index) => `
                        <div class="lesson-card card mb-3">
                            <div class="card-body">
                                <h6 class="card-title">
                                    <span class="badge bg-primary me-2">Lesson ${index + 1}</span>
                                    ${resource.title}
                                </h6>
                                <p class="text-muted">
                                    <i class="fas fa-book me-2"></i>${resource.provider}
                                    <span class="ms-3"><i class="fas fa-clock me-2"></i>${resource.duration}</span>
                                </p>
                                <div class="d-flex justify-content-between">
                                    <span class="badge bg-info">${resource.type}</span>
                                    ${resource.url ? `
                                        <a href="${resource.url}" target="_blank" class="btn btn-outline-primary btn-sm">
                                            <i class="fas fa-external-link-alt me-1"></i>Access
                                        </a>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="text-center mt-4">
                    <button class="btn btn-success" onclick="startQuiz('${skillId}')">
                        Take Quiz
                    </button>
                </div>
            </div>
        `;
        
        modal.show();
    }

    findSkillById(skillId) {
        for (const category in window.skillsDatabase) {
            const skill = window.skillsDatabase[category].find(s => s.id === skillId);
            if (skill) return skill;
        }
        return null;
    }

    getSkillLevel(quizScore) {
        if (quizScore >= 90) return 'Expert';
        if (quizScore >= 70) return 'Advanced';
        if (quizScore >= 50) return 'Intermediate';
        return 'Beginner';
    }

    getSkillLevelColor(quizScore) {
        if (quizScore >= 90) return 'success';
        if (quizScore >= 70) return 'primary';
        if (quizScore >= 50) return 'warning';
        return 'secondary';
    }

    saveAssessment() {
        const assessmentData = {
            timestamp: new Date().toISOString(),
            categories: this.selectedCategories,
            skills: this.selectedSkills,
            userId: 'anonymous'
        };

        // Save to localStorage
        const assessments = this.getSavedAssessments();
        assessments.unshift(assessmentData);
        localStorage.setItem('skillAssessments', JSON.stringify(assessments));

        this.showNotification('Assessment saved successfully!', 'success');
    }

    getSavedAssessments() {
        const saved = localStorage.getItem('skillAssessments');
        return saved ? JSON.parse(saved) : [];
    }

    loadSavedState() {
        const saved = localStorage.getItem('currentAssessment');
        if (saved) {
            const data = JSON.parse(saved);
            const saveTime = new Date(data.timestamp || 0);
            const now = new Date();
            const timeDiff = now - saveTime;
            
            // Only restore state if it's less than 30 minutes old
            if (timeDiff < 30 * 60 * 1000) {
                this.selectedCategories = data.categories || [];
                this.selectedSkills = data.skills || {};
                this.currentStep = data.step || 1;
                
                // Restore UI state
                this.restoreUIState();
            } else {
                // Clear old state
                this.clearAssessmentState();
            }
        }
    }

    restoreUIState() {
        // Restore category selections
        this.selectedCategories.forEach(category => {
            const checkbox = document.getElementById(`${category}Check`);
            const card = document.querySelector(`[data-category="${category}"]`);
            if (checkbox && card) {
                checkbox.checked = true;
                card.classList.add('selected');
            }
        });

        // Restore step
        this.showStep(this.currentStep);
        this.updateProgressBar(this.currentStep === 1 ? 25 : this.currentStep === 2 ? 50 : 100);

        // If on step 2, load skills
        if (this.currentStep === 2) {
            this.loadSkills();
        }

        // Restore skill ratings
        Object.values(this.selectedSkills).forEach(skill => {
            const radio = document.querySelector(`input[name="skill_${skill.id}"][value="${skill.rating}"]`);
            if (radio) {
                radio.checked = true;
            }
        });

        this.updateContinueButton();
    }

    saveCurrentState() {
        const currentState = {
            timestamp: new Date().toISOString(),
            categories: this.selectedCategories,
            skills: this.selectedSkills,
            step: this.currentStep
        };
        localStorage.setItem('currentAssessment', JSON.stringify(currentState));
    }

    showNotification(message, type = 'info') {
        const toastHtml = `
            <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : type === 'danger' ? 'danger' : 'primary'} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        const toastContainer = this.getToastContainer();
        const toastElement = document.createElement('div');
        toastElement.innerHTML = toastHtml;
        toastContainer.appendChild(toastElement.firstElementChild);

        const toast = new bootstrap.Toast(toastContainer.lastElementChild);
        toast.show();
    }

    getToastContainer() {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            document.body.appendChild(container);
        }
        return container;
    }
}

// Global functions
function setAllSkillsRating(level) {
    const assessment = window.skillAssessment;
    if (!assessment) return;
    
    // Convert level to numeric value
    const ratingMap = {
        'beginner': 1,
        'intermediate': 3,
        'expert': 5
    };
    
    const numericRating = ratingMap[level] || 1;
    
    // Get all skill radio buttons for the selected level
    const allRadioButtons = document.querySelectorAll(`input[type="radio"][value="${level}"]`);
    
    // Check all radio buttons for the selected level
    allRadioButtons.forEach(radio => {
        radio.checked = true;
        
        // Trigger change event to update data
        const event = new Event('change', { bubbles: true });
        radio.dispatchEvent(event);
    });
    
    // Show notification
    assessment.showNotification(`All skills set to ${level.charAt(0).toUpperCase() + level.slice(1)} level!`, 'success');
}

function resetAssessment() {
    if (confirm('Are you sure you want to start a fresh assessment? This will clear all your current selections.')) {
        const assessment = window.skillAssessment;
        if (assessment) {
            assessment.clearAssessmentState();
            assessment.goToStep1();
            assessment.showNotification('Assessment reset successfully!', 'info');
        }
    }
}

function showLearningPath(skillId) {
    const assessment = window.skillAssessment;
    if (assessment) {
        const skill = assessment.findSkillById(skillId);
        if (!skill) return;

        const modal = new bootstrap.Modal(document.getElementById('learningModal'));
        const modalBody = document.getElementById('learningContent');
        
        modalBody.innerHTML = `
            <div class="learning-path">
                <h4 class="mb-4">
                    <i class="fas fa-route text-primary me-2"></i>
                    Learning Path: ${skill.name}
                </h4>
                
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card bg-light">
                            <div class="card-body">
                                <h6>Current Level</h6>
                                <p class="mb-0">${assessment.selectedSkills[skillId] ? assessment.selectedSkills[skillId].rating : 1}/5</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card bg-light">
                            <div class="card-body">
                                <h6>Target Level</h6>
                                <p class="mb-0">5/5 (Expert)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h5>Recommended Learning Resources</h5>
                <div class="list-group">
                    ${skill.resources.map((resource, index) => `
                        <div class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-1">${resource.title}</h6>
                                    <p class="mb-1 text-muted">${resource.provider} • ${resource.duration}</p>
                                    <span class="badge bg-primary">${resource.type}</span>
                                </div>
                                ${resource.url ? `
                                    <a href="${resource.url}" target="_blank" class="btn btn-outline-primary btn-sm">
                                        <i class="fas fa-external-link-alt me-1"></i>Access
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="text-center mt-4">
                    <button class="btn btn-success" onclick="startQuiz('${skillId}')">
                        Take Quiz
                    </button>
                </div>
            </div>
        `;
        
        modal.show();
    }
}

function startQuiz(skillId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('learningModal'));
    modal.hide();

    // Simple quiz implementation
    setTimeout(() => {
        alert(`Quiz for ${skillId} would start here. This is a simplified version.`);
    }, 300);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating assessment');
    window.skillAssessment = new SkillAssessment();
});
