// Request/Suggestion System
class RequestSystem {
    constructor(analyzer) {
        this.analyzer = analyzer;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadRecentRequests();
    }

    setupEventListeners() {
        const requestForm = document.getElementById('requestForm');
        if (requestForm) {
            requestForm.addEventListener('submit', (e) => this.handleRequestSubmit(e));
        }
    }

    handleRequestSubmit(event) {
        event.preventDefault();
        
        const formData = {
            type: document.getElementById('requestType').value,
            category: document.getElementById('category').value,
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            priority: document.getElementById('priority').value,
            email: document.getElementById('email').value,
            status: 'pending',
            createdAt: new Date().toISOString(),
            userId: 'anonymous'
        };

        // Save request to localStorage
        this.saveRequest(formData);
        
        // Show success message
        this.showSuccessMessage();
        
        // Reset form
        document.getElementById('requestForm').reset();
        
        // Reload recent requests
        this.loadRecentRequests();
    }

    saveRequest(request) {
        const requests = this.getRequests();
        requests.unshift(request); // Add to beginning
        localStorage.setItem('userRequests', JSON.stringify(requests));
    }

    getRequests() {
        const saved = localStorage.getItem('userRequests');
        return saved ? JSON.parse(saved) : [];
    }

    loadRecentRequests() {
        const requests = this.getRequests();
        const container = document.getElementById('recentRequests');
        
        if (!container) return;

        if (requests.length === 0) {
            container.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-inbox fa-3x mb-3"></i>
                    <p>No requests yet. Be the first to make a request!</p>
                </div>
            `;
            return;
        }

        // Show only the 5 most recent requests
        const recentRequests = requests.slice(0, 5);
        
        let html = '<div class="request-list">';
        
        recentRequests.forEach(request => {
            const priorityColor = this.getPriorityColor(request.priority);
            const typeIcon = this.getRequestTypeIcon(request.type);
            const timeAgo = this.analyzer.getTimeAgo(request.createdAt);
            
            html += `
                <div class="request-item p-3 border rounded mb-3">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center mb-1">
                                <i class="${typeIcon} me-2"></i>
                                <h6 class="mb-0 me-2">${request.title}</h6>
                                <span class="badge bg-${priorityColor}">${request.priority}</span>
                            </div>
                            <p class="mb-1 text-muted">${request.description}</p>
                            <small class="text-muted">
                                ${request.category} • ${timeAgo} • Status: ${request.status}
                            </small>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    getPriorityColor(priority) {
        switch (priority) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'secondary';
        }
    }

    getRequestTypeIcon(type) {
        switch (type) {
            case 'skill': return 'fas fa-code text-primary';
            case 'course': return 'fas fa-graduation-cap text-success';
            case 'improvement': return 'fas fa-tools text-warning';
            case 'other': return 'fas fa-lightbulb text-info';
            default: return 'fas fa-question-circle text-secondary';
        }
    }

    showSuccessMessage() {
        const successHtml = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i>
                <strong>Request submitted successfully!</strong> We'll review your request and get back to you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        // Insert after the form
        const form = document.getElementById('requestForm');
        form.insertAdjacentHTML('afterend', successHtml);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            const alert = document.querySelector('.alert-success');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    }
}

// Initialize request system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the main analyzer to be initialized
    if (window.skillAnalyzer) {
        window.requestSystem = new RequestSystem(window.skillAnalyzer);
    } else {
        // Fallback if main analyzer isn't ready yet
        setTimeout(() => {
            if (window.skillAnalyzer) {
                window.requestSystem = new RequestSystem(window.skillAnalyzer);
            }
        }, 100);
    }
});
