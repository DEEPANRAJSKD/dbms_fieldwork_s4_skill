// Progress Tracking - Complete Working System
class ProgressTracker {
    constructor() {
        this.progressData = {};
        this.progressChart = null;
        this.init();
    }

    init() {
        console.log('Progress tracker initialized');
        this.loadProgressData();
        this.autoSyncWithAnalyzer(); // Auto-sync with analyzer
        this.initializeCharts();
        this.updateUI();
    }

    autoSyncWithAnalyzer() {
        // Check for analyzer data and sync progress automatically
        const analyzerData = localStorage.getItem('skillAssessments');
        if (analyzerData) {
            const assessments = JSON.parse(analyzerData);
            if (assessments.length > 0) {
                const latestAssessment = assessments[0];
                
                // Update progress data with latest assessment
                Object.values(latestAssessment.skills).forEach(skill => {
                    if (!this.progressData[skill.id]) {
                        this.progressData[skill.id] = {
                            completedLessons: 0,
                            quizScore: skill.rating * 20, // Convert 1-5 to percentage
                            lastActivity: new Date().toISOString()
                        };
                    }
                });
                
                this.saveProgressData();
                console.log('Progress automatically synced with latest assessment');
            }
        }
    }

    loadProgressData() {
        const saved = localStorage.getItem('learningProgress');
        this.progressData = saved ? JSON.parse(saved) : {};
        console.log('Progress data loaded:', this.progressData);
    }

    saveProgressData() {
        localStorage.setItem('learningProgress', JSON.stringify(this.progressData));
    }

    initializeCharts() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) {
            console.log('Chart canvas not found');
            return;
        }

        const chartData = this.prepareChartData();
        console.log('Chart data prepared:', chartData);

        this.progressChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Skill Progress',
                    data: chartData.data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
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
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
        
        console.log('Chart initialized successfully');
    }

    prepareChartData() {
        const categoryProgress = {
            technical: 0,
            design: 0,
            business: 0,
            soft: 0
        };

        // Calculate progress for each category
        for (const category in window.skillsDatabase) {
            const skills = window.skillsDatabase[category];
            let totalProgress = 0;
            let skillCount = 0;

            skills.forEach(skill => {
                const progress = this.progressData[skill.id];
                if (progress) {
                    const lessonProgress = (progress.completedLessons / skill.resources.length) * 100;
                    const quizProgress = progress.quizScore;
                    const overallProgress = (lessonProgress + quizProgress) / 2;
                    totalProgress += overallProgress;
                    skillCount++;
                }
            });

            if (skillCount > 0) {
                categoryProgress[category] = Math.round(totalProgress / skillCount);
            } else {
                categoryProgress[category] = 0;
            }
        }

        return {
            labels: ['Technical', 'Design', 'Business', 'Soft Skills'],
            data: [
                categoryProgress.technical,
                categoryProgress.design,
                categoryProgress.business,
                categoryProgress.soft
            ]
        };
    }

    updateUI() {
        console.log('Updating progress UI');
        
        // Update stats
        this.updateStats();
        
        // Update category progress
        this.updateCategoryProgress();
        
        // Update detailed skill progress
        this.updateSkillProgressDetails();
        
        // Update achievements
        this.updateAchievements();
        
        console.log('Progress UI updated');
    }

    updateStats() {
        const totalSkills = Object.keys(this.progressData).length;
        const completedLessons = Object.values(this.progressData).reduce((sum, skill) => sum + skill.completedLessons, 0);
        const quizScores = Object.values(this.progressData).map(skill => skill.quizScore).filter(score => score > 0);
        const averageScore = quizScores.length > 0 ? 
            Math.round(quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length) : 0;

        const totalSkillsEl = document.getElementById('totalSkills');
        const completedLessonsEl = document.getElementById('completedLessons');
        const averageScoreEl = document.getElementById('averageScore');
        
        console.log('Updating stats:', { totalSkills, completedLessons, averageScore });
        
        if (totalSkillsEl) totalSkillsEl.textContent = totalSkills;
        if (completedLessonsEl) completedLessonsEl.textContent = completedLessons;
        if (averageScoreEl) averageScoreEl.textContent = averageScore + '%';
    }

    updateCategoryProgress() {
        const categoryProgress = document.getElementById('categoryProgress');
        if (!categoryProgress) return;

        const categories = ['technical', 'design', 'business', 'soft'];
        const categoryNames = {
            technical: 'Technical Skills',
            design: 'Design Skills', 
            business: 'Business Skills',
            soft: 'Soft Skills'
        };
        const categoryColors = {
            technical: 'primary',
            design: 'success',
            business: 'warning',
            soft: 'info'
        };

        let html = '<div class="row">';
        
        categories.forEach(category => {
            const skills = window.skillsDatabase[category];
            let totalProgress = 0;
            let totalLessons = 0;
            let skillCount = 0;

            skills.forEach(skill => {
                const progress = this.progressData[skill.id];
                if (progress) {
                    totalProgress += progress.completedLessons;
                    totalLessons += skill.resources.length;
                    skillCount++;
                }
            });

            const percentage = totalLessons > 0 ? Math.round((totalProgress / totalLessons) * 100) : 0;

            html += `
                <div class="col-md-6 mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span>${categoryNames[category]}</span>
                        <span class="text-muted">${percentage}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-${categoryColors[category]}" style="width: ${percentage}%"></div>
                    </div>
                    <small class="text-muted">${skillCount} skills • ${totalProgress}/${totalLessons} lessons</small>
                </div>
            `;
        });

        html += '</div>';
        categoryProgress.innerHTML = html;
    }

    updateSkillProgressDetails() {
        const detailsContainer = document.getElementById('skillProgressDetails');
        if (!detailsContainer) return;

        let html = '<div class="row">';
        
        // Loop through ALL categories and skills in the database
        for (const category in window.skillsDatabase) {
            const skills = window.skillsDatabase[category];
            const categoryNames = {
                technical: 'Technical Skills',
                design: 'Design Skills',
                business: 'Business Skills',
                soft: 'Soft Skills'
            };
            
            // Add category header
            html += `
                <div class="col-12 mb-3">
                    <h5 class="text-primary">
                        <i class="fas fa-folder me-2"></i>${categoryNames[category]}
                    </h5>
                </div>
            `;
            
            skills.forEach(skill => {
                const progress = this.progressData[skill.id];
                
                if (progress) {
                    // Skill has progress data
                    const lessonProgress = Math.round((progress.completedLessons / skill.resources.length) * 100);
                    const level = this.getSkillLevel(progress.quizScore);
                    const levelColor = this.getSkillLevelColor(progress.quizScore);
                    const progressColor = lessonProgress === 100 ? 'success' : lessonProgress > 0 ? 'primary' : 'secondary';

                    html += `
                        <div class="col-md-6 mb-3">
                            <div class="skill-progress-card p-3 border rounded">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h6 class="mb-0">${skill.name}</h6>
                                    <span class="badge bg-${levelColor}">${level}</span>
                                </div>
                                <div class="progress mb-2">
                                    <div class="progress-bar bg-${progressColor}" style="width: ${lessonProgress}%"></div>
                                </div>
                                <small class="text-muted">
                                    ${progress.completedLessons}/${skill.resources.length} lessons completed 
                                    ${progress.quizScore > 0 ? `• Quiz score: ${progress.quizScore}%` : ''}
                                </small>
                                <div class="mt-2">
                                    ${lessonProgress < 100 ? 
                                        `<button class="btn btn-sm btn-primary" onclick="startLearning('${skill.id}')">
                                            <i class="fas fa-play me-1"></i>Continue Learning
                                        </button>` :
                                        `<button class="btn btn-sm btn-success" onclick="reviewSkill('${skill.id}')">
                                            <i class="fas fa-redo me-1"></i>Review
                                        </button>`
                                    }
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    // Skill has no progress data - show as not started
                    html += `
                        <div class="col-md-6 mb-3">
                            <div class="skill-progress-card p-3 border rounded bg-light">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h6 class="mb-0">${skill.name}</h6>
                                    <span class="badge bg-secondary">Not Started</span>
                                </div>
                                <p class="text-muted small mb-2">${skill.description}</p>
                                <div class="progress mb-2">
                                    <div class="progress-bar bg-light" style="width: 0%"></div>
                                </div>
                                <small class="text-muted">
                                    0/${skill.resources.length} lessons completed
                                </small>
                                <div class="mt-2">
                                    <button class="btn btn-sm btn-outline-primary" onclick="startLearning('${skill.id}')">
                                        <i class="fas fa-play me-1"></i>Start Learning
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
        }

        html += '</div>';
        
        if (!window.skillsDatabase || Object.keys(window.skillsDatabase).length === 0) {
            html = '<p class="text-center text-muted">No skills available in the database.</p>';
        }

        detailsContainer.innerHTML = html;
    }

    updateAchievements() {
        const achievementsContainer = document.getElementById('achievements');
        if (!achievementsContainer) return;

        const achievements = this.calculateAchievements();
        
        let html = '<div class="row">';
        
        achievements.forEach(achievement => {
            html += `
                <div class="col-md-4 mb-3">
                    <div class="achievement-card p-3 border rounded text-center ${achievement.unlocked ? '' : 'opacity-50'}">
                        <div class="achievement-icon mb-2">
                            <i class="${achievement.icon} fa-2x ${achievement.unlocked ? 'text-warning' : 'text-muted'}"></i>
                        </div>
                        <h6 class="mb-1">${achievement.title}</h6>
                        <p class="mb-0 text-muted small">${achievement.description}</p>
                        ${achievement.unlocked ? 
                            `<small class="text-success"><i class="fas fa-check me-1"></i>Unlocked</small>` : 
                            `<small class="text-muted">Locked</small>`
                        }
                    </div>
                </div>
            `;
        });

        html += '</div>';
        achievementsContainer.innerHTML = html;
    }

    calculateAchievements() {
        const achievements = [
            {
                id: 'first_skill',
                title: 'First Steps',
                description: 'Complete your first lesson',
                icon: 'fas fa-shoe-prints',
                unlocked: false
            },
            {
                id: 'quiz_master',
                title: 'Quiz Master',
                description: 'Score 90% or higher on any quiz',
                icon: 'fas fa-brain',
                unlocked: false
            },
            {
                id: 'skill_collector',
                title: 'Skill Collector',
                description: 'Start learning 5 different skills',
                icon: 'fas fa-graduation-cap',
                unlocked: false
            },
            {
                id: 'dedicated_learner',
                title: 'Dedicated Learner',
                description: 'Complete 20 lessons total',
                icon: 'fas fa-book',
                unlocked: false
            },
            {
                id: 'balanced_skillset',
                title: 'Balanced Skillset',
                description: 'Learn skills from all 4 categories',
                icon: 'fas fa-balance-scale',
                unlocked: false
            },
            {
                id: 'expert_level',
                title: 'Expert Level',
                description: 'Complete all lessons in any skill',
                icon: 'fas fa-trophy',
                unlocked: false
            }
        ];

        const totalLessons = Object.values(this.progressData).reduce((sum, skill) => sum + skill.completedLessons, 0);
        const skillsStarted = Object.keys(this.progressData).length;
        const highScores = Object.values(this.progressData).filter(skill => skill.quizScore >= 90).length;
        const categoriesLearned = new Set();

        Object.entries(this.progressData).forEach(([skillId, progress]) => {
            const skill = this.findSkillById(skillId);
            if (skill) {
                for (const category in window.skillsDatabase) {
                    if (window.skillsDatabase[category].some(s => s.id === skillId)) {
                        categoriesLearned.add(category);
                        break;
                    }
                }
            }
        });

        // Check achievements
        achievements[0].unlocked = totalLessons >= 1;
        achievements[1].unlocked = highScores >= 1;
        achievements[2].unlocked = skillsStarted >= 5;
        achievements[3].unlocked = totalLessons >= 20;
        achievements[4].unlocked = categoriesLearned.size >= 4;

        // Check for expert level (all lessons in any skill completed)
        achievements[5].unlocked = Object.entries(this.progressData).some(([skillId, progress]) => {
            const skill = this.findSkillById(skillId);
            return skill && progress.completedLessons >= skill.resources.length;
        });

        return achievements;
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
}

// Global functions for skill actions
function startLearning(skillId) {
    // Check if we're on progress page, if so, open skill details modal
    if (window.location.pathname.includes('progress.html')) {
        openSkillDetailsModal(skillId);
    } else {
        // Redirect to analyzer page with skill pre-selected
        window.location.href = `analyzer.html?skill=${skillId}`;
    }
}

function openSkillDetailsModal(skillId) {
    const skill = window.progressTracker.findSkillById(skillId);
    if (!skill) return;
    
    const modal = new bootstrap.Modal(document.getElementById('skillDetailsModal'));
    const modalBody = document.getElementById('skillDetailsContent');
    
    modalBody.innerHTML = `
        <div class="skill-details">
            <h4 class="mb-3">
                <i class="fas fa-graduation-cap text-primary me-2"></i>
                ${skill.name}
            </h4>
            <p class="text-muted mb-4">${skill.description}</p>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6>Learning Resources</h6>
                            <div class="list-group">
                                ${skill.resources.map((resource, index) => `
                                    <div class="list-group-item">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-1">${resource.title}</h6>
                                                <small class="text-muted">
                                                    <i class="fas fa-book me-1"></i>${resource.provider}
                                                    <span class="ms-2"><i class="fas fa-clock me-1"></i>${resource.duration}</span>
                                                </small>
                                            </div>
                                            <span class="badge bg-primary">${resource.type}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-4">
                <button class="btn btn-primary btn-lg" onclick="window.location.href='analyzer.html?skill=${skillId}'">
                    <i class="fas fa-chart-line me-2"></i>Rate This Skill
                </button>
                <button class="btn btn-success btn-lg ms-2" onclick="startSkillQuiz('${skillId}')">
                    <i class="fas fa-question-circle me-2"></i>Take Quiz
                </button>
            </div>
        </div>
    `;
    
    modal.show();
}

function startSkillQuiz(skillId) {
    const skill = window.progressTracker.findSkillById(skillId);
    if (skill) {
        alert(`Starting quiz for ${skill.name} - Quiz functionality would be implemented here.`);
        // In a real implementation, this would open the quiz modal
    }
}

function reviewSkill(skillId) {
    // Open learning modal for completed skill
    const skill = window.progressTracker.findSkillById(skillId);
    if (skill) {
        alert(`Reviewing ${skill.name} - This would open the learning materials for review.`);
        // In a real implementation, this would open a review modal
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating progress tracker');
    window.progressTracker = new ProgressTracker();
    
    // Debug: Check if page elements exist
    setTimeout(() => {
        const progressChart = document.getElementById('progressChart');
        const totalSkills = document.getElementById('totalSkills');
        const completedLessons = document.getElementById('completedLessons');
        const averageScore = document.getElementById('averageScore');
        const categoryProgress = document.getElementById('categoryProgress');
        const skillProgressDetails = document.getElementById('skillProgressDetails');
        const achievements = document.getElementById('achievements');
        
        console.log('Progress page elements found:', {
            progressChart: !!progressChart,
            totalSkills: !!totalSkills,
            completedLessons: !!completedLessons,
            averageScore: !!averageScore,
            categoryProgress: !!categoryProgress,
            skillProgressDetails: !!skillProgressDetails,
            achievements: !!achievements
        });
    }, 200);
});
