// Skill Analyzer - Main Application (No Login Version)
class SkillAnalyzer {
    constructor() {
        this.selectedCategories = [];
        this.selectedSkills = {};
        this.userProgress = {};
        this.userRequests = [];
        this.init();
    }

    init() {
        this.loadProgressData();
        this.loadRequestData();
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {
        // Start analyzer button
        const startAnalyzerBtn = document.getElementById('startAnalyzerBtn');
        if (startAnalyzerBtn) {
            startAnalyzerBtn.addEventListener('click', () => this.startAnalyzer());
        }

        // Learn more button
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => this.scrollToFeatures());
        }
    }

    // Progress Management
    loadProgressData() {
        const saved = localStorage.getItem('learningProgress');
        this.userProgress = saved ? JSON.parse(saved) : {};
    }

    saveProgressData() {
        localStorage.setItem('learningProgress', JSON.stringify(this.userProgress));
    }

    // Request Management
    loadRequestData() {
        const saved = localStorage.getItem('userRequests');
        this.userRequests = saved ? JSON.parse(saved) : [];
    }

    saveRequestData() {
        localStorage.setItem('userRequests', JSON.stringify(this.userRequests));
    }

    // Navigation
    startAnalyzer() {
        window.location.href = 'analyzer.html';
    }

    scrollToFeatures() {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    }

    updateUI() {
        // No login button to update
    }

    // Utility Functions
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

    // Skill Finding
    findSkillById(skillId) {
        for (const category in window.skillsDatabase) {
            const skill = window.skillsDatabase[category].find(s => s.id === skillId);
            if (skill) return skill;
        }
        return null;
    }

    // Helper Functions
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

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    }
}

// Learning System
class LearningSystem {
    constructor(analyzer) {
        this.analyzer = analyzer;
        this.currentSkill = null;
        this.currentLesson = 0;
        this.currentQuestionIndex = 0;
        this.quizAnswers = [];
        this.init();
    }

    init() {
        this.setupKnowledgeButtons();
    }

    setupKnowledgeButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('knowledge-button')) {
                const skillId = e.target.dataset.skillId;
                this.openLearningModule(skillId);
            }
        });
    }

    openLearningModule(skillId) {
        const skill = this.analyzer.findSkillById(skillId);
        if (!skill) return;

        this.currentSkill = skill;
        this.currentLesson = 0;

        const modal = new bootstrap.Modal(document.getElementById('learningModal'));
        const modalBody = document.getElementById('learningContent');

        modalBody.innerHTML = this.generateLearningContent();
        modal.show();

        this.setupLessonNavigation();
    }

    generateLearningContent() {
        if (!this.currentSkill) return '';

        const progress = this.analyzer.userProgress[this.currentSkill.id] || { completedLessons: 0, quizScore: 0 };
        const totalLessons = this.currentSkill.resources.length;

        return `
            <div class="learning-module">
                <div class="learning-header mb-4">
                    <h4 class="mb-3">
                        <i class="fas fa-graduation-cap text-primary me-2"></i>
                        ${this.currentSkill.name} Learning Path
                    </h4>
                    <div class="progress mb-3">
                        <div class="progress-bar" style="width: ${(progress.completedLessons / totalLessons) * 100}%">
                            ${progress.completedLessons}/${totalLessons} Lessons Completed
                        </div>
                    </div>
                </div>

                <div class="learning-content">
                    ${this.generateLessonContent()}
                </div>

                <div class="learning-navigation mt-4">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-secondary" onclick="learningSystem.previousLesson()" id="prevBtn" disabled>
                            <i class="fas fa-arrow-left me-2"></i>Previous
                        </button>
                        <button class="btn btn-primary" onclick="learningSystem.nextLesson()" id="nextBtn">
                            Next<i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>

                <div class="learning-actions mt-4">
                    <div class="text-center">
                        <button class="btn btn-success btn-lg" onclick="learningSystem.startQuiz()">
                            <i class="fas fa-question-circle me-2"></i>Take Quiz
                        </button>
                        <div class="mt-2">
                            <small class="text-muted">Best Score: ${progress.quizScore}%</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateLessonContent() {
        const lesson = this.currentSkill.resources[this.currentLesson];
        if (!lesson) return '';

        return `
            <div class="lesson-card">
                <div class="card">
                    <div class="card-body">
                        <div class="lesson-header mb-3">
                            <h5 class="card-title">
                                <span class="badge bg-primary me-2">Lesson ${this.currentLesson + 1}</span>
                                ${lesson.title}
                            </h5>
                            <p class="text-muted">
                                <i class="fas fa-book me-2"></i>${lesson.provider}
                                <span class="ms-3"><i class="fas fa-clock me-2"></i>${lesson.duration}</span>
                            </p>
                        </div>

                        <div class="lesson-content">
                            ${this.generateLessonContentForType(lesson)}
                        </div>

                        <div class="lesson-actions mt-3">
                            ${lesson.url ? `
                                <a href="${lesson.url}" target="_blank" class="btn btn-outline-primary">
                                    <i class="fas fa-external-link-alt me-2"></i>Access Resource
                                </a>
                            ` : ''}
                            <button class="btn btn-success ms-2" onclick="learningSystem.markLessonComplete()">
                                <i class="fas fa-check me-2"></i>Mark Complete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateLessonContentForType(lesson) {
        switch (lesson.type) {
            case 'course':
                return `
                    <div class="course-content">
                        <p><strong>Course Overview:</strong> This comprehensive course covers ${this.currentSkill.name} in depth.</p>
                        <div class="course-features">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-video text-primary me-2"></i>Video lectures and demonstrations</li>
                                <li><i class="fas fa-code text-success me-2"></i>Hands-on coding exercises</li>
                                <li><i class="fas fa-certificate text-warning me-2"></i>Certificate of completion</li>
                                <li><i class="fas fa-users text-info me-2"></i>Community support</li>
                            </ul>
                        </div>
                        <div class="learning-objectives mt-3">
                            <h6>Learning Objectives:</h6>
                            <ul>
                                <li>Master fundamental concepts of ${this.currentSkill.name}</li>
                                <li>Apply best practices in real-world scenarios</li>
                                <li>Build confidence through practical exercises</li>
                            </ul>
                        </div>
                    </div>
                `;
            case 'tutorial':
                return `
                    <div class="tutorial-content">
                        <p><strong>Tutorial Guide:</strong> Step-by-step tutorial for ${this.currentSkill.name}.</p>
                        <div class="tutorial-steps">
                            <h6>What you'll learn:</h6>
                            <ol>
                                <li>Understanding the basics and core concepts</li>
                                <li>Setting up your development environment</li>
                                <li>Creating your first project</li>
                                <li>Advanced techniques and best practices</li>
                                <li>Troubleshooting common issues</li>
                            </ol>
                        </div>
                        <div class="tips-section mt-3">
                            <h6><i class="fas fa-lightbulb text-warning me-2"></i>Pro Tips:</h6>
                            <ul>
                                <li>Practice regularly to reinforce learning</li>
                                <li>Join online communities for support</li>
                                <li>Build projects to apply your knowledge</li>
                            </ul>
                        </div>
                    </div>
                `;
            case 'practice':
                return `
                    <div class="practice-content">
                        <p><strong>Practice Exercises:</strong> Hands-on practice for ${this.currentSkill.name}.</p>
                        <div class="practice-types">
                            <h6>Practice Activities:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="practice-card card bg-light">
                                        <div class="card-body">
                                            <h6><i class="fas fa-code text-primary me-2"></i>Coding Challenges</h6>
                                            <p>Solve progressively difficult problems</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="practice-card card bg-light">
                                        <div class="card-body">
                                            <h6><i class="fas fa-project-diagram text-success me-2"></i>Mini Projects</h6>
                                            <p>Build small applications to practice skills</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="practice-benefits mt-3">
                            <h6>Benefits of Practice:</h6>
                            <ul>
                                <li>Reinforce theoretical knowledge</li>
                                <li>Build problem-solving skills</li>
                                <li>Create portfolio-worthy projects</li>
                            </ul>
                        </div>
                    </div>
                `;
            default:
                return `<p>Comprehensive learning content for ${lesson.title}.</p>`;
        }
    }

    setupLessonNavigation() {
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentLesson === 0;
        }

        if (nextBtn) {
            const isLastLesson = this.currentLesson === this.currentSkill.resources.length - 1;
            nextBtn.innerHTML = isLastLesson ? 
                'Complete<i class="fas fa-check ms-2"></i>' : 
                'Next<i class="fas fa-arrow-right ms-2"></i>';
        }
    }

    previousLesson() {
        if (this.currentLesson > 0) {
            this.currentLesson--;
            this.refreshLearningContent();
        }
    }

    nextLesson() {
        if (this.currentLesson < this.currentSkill.resources.length - 1) {
            this.currentLesson++;
            this.refreshLearningContent();
        }
    }

    refreshLearningContent() {
        const modalBody = document.getElementById('learningContent');
        if (modalBody) {
            modalBody.innerHTML = this.generateLearningContent();
            this.setupLessonNavigation();
        }
    }

    markLessonComplete() {
        if (!this.currentSkill) return;

        const skillId = this.currentSkill.id;
        if (!this.analyzer.userProgress[skillId]) {
            this.analyzer.userProgress[skillId] = { completedLessons: 0, quizScore: 0 };
        }

        this.analyzer.userProgress[skillId].completedLessons = Math.min(
            this.analyzer.userProgress[skillId].completedLessons + 1,
            this.currentSkill.resources.length
        );

        this.analyzer.saveProgressData();
        this.refreshLearningContent();

        this.analyzer.showNotification('Lesson marked as complete!', 'success');
    }

    startQuiz() {
        if (!this.currentSkill || !this.currentSkill.mcqQuestions || this.currentSkill.mcqQuestions.length === 0) {
            this.analyzer.showNotification('No quiz available for this skill yet.', 'warning');
            return;
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('learningModal'));
        modal.hide();

        this.showQuizModal();
    }

    showQuizModal() {
        const quizModal = new bootstrap.Modal(document.getElementById('quizModal'));
        const quizContent = document.getElementById('quizContent');

        this.currentQuestionIndex = 0;
        this.quizAnswers = [];
        const totalQuestions = this.currentSkill.mcqQuestions.length;

        quizContent.innerHTML = this.generateQuizContent();
        quizModal.show();
    }

    generateQuizContent() {
        const question = this.currentSkill.mcqQuestions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / this.currentSkill.mcqQuestions.length) * 100;

        return `
            <div class="quiz-container">
                <div class="quiz-header mb-4">
                    <h4 class="mb-3">
                        <i class="fas fa-question-circle text-primary me-2"></i>
                        ${this.currentSkill.name} Quiz
                    </h4>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${progress}%">
                            Question ${this.currentQuestionIndex + 1} of ${this.currentSkill.mcqQuestions.length}
                        </div>
                    </div>
                </div>

                <div class="quiz-question">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title mb-3">${question.question}</h5>
                            <div class="quiz-options">
                                ${question.options.map((option, index) => `
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="radio" name="quizAnswer" id="option${index}" value="${index}">
                                        <label class="form-check-label" for="option${index}">
                                            ${option}
                                        </label>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="quiz-actions mt-4">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-secondary" onclick="learningSystem.previousQuestion()" id="quizPrevBtn" disabled>
                            <i class="fas fa-arrow-left me-2"></i>Previous
                        </button>
                        <button class="btn btn-primary" onclick="learningSystem.nextQuestion()" id="quizNextBtn">
                            Next<i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.refreshQuizContent();
        }
    }

    nextQuestion() {
        const selectedAnswer = document.querySelector('input[name="quizAnswer"]:checked');
        
        if (!selectedAnswer) {
            this.analyzer.showNotification('Please select an answer', 'warning');
            return;
        }

        this.quizAnswers[this.currentQuestionIndex] = parseInt(selectedAnswer.value);

        if (this.currentQuestionIndex < this.currentSkill.mcqQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.refreshQuizContent();
        } else {
            this.submitQuiz();
        }
    }

    refreshQuizContent() {
        const quizContent = document.getElementById('quizContent');
        if (quizContent) {
            quizContent.innerHTML = this.generateQuizContent();
            
            if (this.quizAnswers[this.currentQuestionIndex] !== undefined) {
                const option = document.getElementById(`option${this.quizAnswers[this.currentQuestionIndex]}`);
                if (option) option.checked = true;
            }

            this.updateQuizNavigation();
        }
    }

    updateQuizNavigation() {
        const prevBtn = document.getElementById('quizPrevBtn');
        const nextBtn = document.getElementById('quizNextBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }

        if (nextBtn) {
            const isLastQuestion = this.currentQuestionIndex === this.currentSkill.mcqQuestions.length - 1;
            nextBtn.innerHTML = isLastQuestion ? 
                'Submit<i class="fas fa-check ms-2"></i>' : 
                'Next<i class="fas fa-arrow-right ms-2"></i>';
        }
    }

    submitQuiz() {
        const correctAnswers = this.currentSkill.mcqQuestions.filter((q, index) => 
            q.correct === this.quizAnswers[index]
        ).length;

        const score = Math.round((correctAnswers / this.currentSkill.mcqQuestions.length) * 100);

        const skillId = this.currentSkill.id;
        if (!this.analyzer.userProgress[skillId]) {
            this.analyzer.userProgress[skillId] = { completedLessons: 0, quizScore: 0 };
        }

        this.analyzer.userProgress[skillId].quizScore = Math.max(this.analyzer.userProgress[skillId].quizScore, score);
        this.analyzer.saveProgressData();

        this.showQuizResults(correctAnswers);
    }

    showQuizResults(correctAnswers) {
        const quizContent = document.getElementById('quizContent');
        const quizModal = bootstrap.Modal.getInstance(document.getElementById('quizModal'));

        quizContent.innerHTML = `
            <div class="quiz-results">
                <div class="text-center mb-4">
                    <div class="result-circle mb-3">
                        <i class="fas fa-trophy ${score >= 70 ? 'text-warning' : 'text-primary'} fa-3x"></i>
                    </div>
                    <h4>Quiz Complete!</h4>
                    <h2 class="${score >= 70 ? 'text-success' : 'text-warning'}">
                        ${score}%
                    </h2>
                    <p class="text-muted">You got ${correctAnswers} out of ${this.currentSkill.mcqQuestions.length} questions correct</p>
                </div>

                <div class="results-details mb-4">
                    <h5>Review Your Answers:</h5>
                    ${this.currentSkill.mcqQuestions.map((q, index) => `
                        <div class="question-review mb-3 p-3 border rounded ${q.correct === this.quizAnswers[index] ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}">
                            <div class="d-flex align-items-start">
                                <div class="me-3">
                                    <i class="fas ${q.correct === this.quizAnswers[index] ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <p class="mb-1"><strong>Q${index + 1}:</strong> ${q.question}</p>
                                    <p class="mb-1"><strong>Your Answer:</strong> ${q.options[this.quizAnswers[index]]}</p>
                                    ${q.correct !== this.quizAnswers[index] ? `
                                        <p class="mb-1 text-success"><strong>Correct Answer:</strong> ${q.options[q.correct]}</p>
                                        <p class="mb-0 text-muted"><small>${q.explanation}</small></p>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="results-actions">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-secondary" onclick="learningSystem.startQuiz()">
                            <i class="fas fa-redo me-2"></i>Retake Quiz
                        </button>
                        <button class="btn btn-primary" onclick="learningSystem.closeQuiz()">
                            <i class="fas fa-times me-2"></i>Close
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    closeQuiz() {
        const quizModal = bootstrap.Modal.getInstance(document.getElementById('quizModal'));
        quizModal.hide();

        setTimeout(() => {
            this.openLearningModule(this.currentSkill.id);
        }, 300);
    }
}

// Initialize Application
let skillAnalyzer;
let learningSystem;

document.addEventListener('DOMContentLoaded', function() {
    skillAnalyzer = new SkillAnalyzer();
    learningSystem = new LearningSystem(skillAnalyzer);
    
    // Make available globally
    window.skillAnalyzer = skillAnalyzer;
    window.learningSystem = learningSystem;
});
