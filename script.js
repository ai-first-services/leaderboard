// Sample data for demonstration
let companies = [
    {
        id: 1,
        name: "AI DocAssist",
        website: "https://aidocassist.com",
        description: "AI-powered document automation and workflow optimization for healthcare providers",
        arr: "5000000-10000000",
        arrDisplay: "$5M - $10M",
        arrValue: 7500000,
        region: "North America",
        vertical: "Healthcare",
        growth: 180,
        submittedBy: "Demo User",
        submittedEmail: "demo@example.com",
        relation: "Industry Observer"
    },
    {
        id: 2,
        name: "FinanceGPT Pro",
        website: "https://financegptpro.com",
        description: "AI-driven financial analysis and automated reporting for mid-market companies",
        arr: "10000000-25000000",
        arrDisplay: "$10M - $25M",
        arrValue: 15000000,
        region: "EU",
        vertical: "Finance",
        growth: 220,
        submittedBy: "Demo User",
        submittedEmail: "demo@example.com",
        relation: "Customer"
    },
    {
        id: 3,
        name: "EduAI Solutions",
        website: "https://eduaisolutions.com",
        description: "Personalized learning platforms powered by adaptive AI for K-12 education",
        arr: "1000000-5000000",
        arrDisplay: "$1M - $5M",
        arrValue: 3000000,
        region: "India",
        vertical: "Education",
        growth: 340,
        submittedBy: "Demo User",
        submittedEmail: "demo@example.com",
        relation: "Founder/CEO"
    },
    {
        id: 4,
        name: "RetailBot Analytics",
        website: "https://retailbot.com",
        description: "AI-powered inventory optimization and demand forecasting for e-commerce",
        arr: "25000000-50000000",
        arrDisplay: "$25M - $50M",
        arrValue: 35000000,
        region: "China",
        vertical: "Retail",
        growth: 120,
        submittedBy: "Demo User",
        submittedEmail: "demo@example.com",
        relation: "Investor"
    },
    {
        id: 5,
        name: "LegalMind AI",
        website: "https://legalmind.ai",
        description: "Contract analysis and legal research automation for law firms",
        arr: "500000-1000000",
        arrDisplay: "$500K - $1M",
        arrValue: 750000,
        region: "North America",
        vertical: "Legal",
        growth: 280,
        submittedBy: "Demo User",
        submittedEmail: "demo@example.com",
        relation: "Employee"
    },
    {
        id: 6,
        name: "ManufacturingAI+",
        website: "https://manufacturingai.plus",
        description: "Predictive maintenance and quality control AI for manufacturing plants",
        arr: "5000000-10000000",
        arrDisplay: "$5M - $10M",
        arrValue: 8000000,
        region: "GCC",
        vertical: "Manufacturing",
        growth: 150,
        submittedBy: "Demo User",
        submittedEmail: "demo@example.com",
        relation: "Customer"
    }
];

let filteredCompanies = [...companies];
let currentSort = 'arr-desc';

// DOM Elements
const leaderboardBody = document.getElementById('leaderboardBody');
const regionFilter = document.getElementById('regionFilter');
const verticalFilter = document.getElementById('verticalFilter');
const sortFilter = document.getElementById('sortFilter');
const submissionModal = document.getElementById('submissionModal');
const submissionForm = document.getElementById('submissionForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    filterCompanies();
    setupFormSubmission();
});

// Filter companies based on selected criteria
function filterCompanies() {
    const selectedRegion = regionFilter.value;
    const selectedVertical = verticalFilter.value;
    
    filteredCompanies = companies.filter(company => {
        const regionMatch = !selectedRegion || company.region === selectedRegion;
        const verticalMatch = !selectedVertical || company.vertical === selectedVertical;
        return regionMatch && verticalMatch;
    });
    
    sortCompanies();
}

// Sort companies based on selected criteria
function sortCompanies() {
    const sortBy = sortFilter.value;
    
    filteredCompanies.sort((a, b) => {
        switch(sortBy) {
            case 'arr-desc':
                return b.arrValue - a.arrValue;
            case 'arr-asc':
                return a.arrValue - b.arrValue;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'growth-desc':
                return (b.growth || 0) - (a.growth || 0);
            default:
                return b.arrValue - a.arrValue;
        }
    });
    
    renderLeaderboard();
}

// Render the leaderboard
function renderLeaderboard() {
    if (filteredCompanies.length === 0) {
        leaderboardBody.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #718096;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No companies found</p>
                <p style="font-size: 0.9rem;">Try adjusting your filters or submit a new company!</p>
            </div>
        `;
        return;
    }
    
    leaderboardBody.innerHTML = filteredCompanies.map((company, index) => `
        <div class="company-row">
            <div class="company-rank">#${index + 1}</div>
            <div class="company-info">
                <div class="company-name">${company.name}</div>
                <div class="company-description">${company.description}</div>
                <a href="${company.website}" target="_blank" class="company-website" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> ${company.website.replace('https://', '').replace('http://', '')}
                </a>
            </div>
            <div class="company-arr">${company.arrDisplay}</div>
            <div class="company-region">${company.region}</div>
            <div class="company-vertical">${company.vertical}</div>
            <div class="company-growth">${company.growth ? company.growth + '%' : 'N/A'}</div>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    const totalCompanies = companies.length;
    const totalRegions = new Set(companies.map(c => c.region)).size;
    const totalVerticals = new Set(companies.map(c => c.vertical)).size;
    
    document.getElementById('totalCompanies').textContent = totalCompanies;
    document.getElementById('totalRegions').textContent = totalRegions;
    document.getElementById('totalVerticals').textContent = totalVerticals;
}

// Modal functions
function openSubmissionModal() {
    submissionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSubmissionModal() {
    submissionModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    submissionForm.reset();
    clearMessages();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === submissionModal) {
        closeSubmissionModal();
    }
}

// Form submission setup
function setupFormSubmission() {
    submissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
}

// Handle form submission
function handleFormSubmission() {
    const formData = new FormData(submissionForm);
    const newCompany = {
        id: companies.length + 1,
        name: formData.get('companyName'),
        website: formData.get('companyWebsite'),
        description: formData.get('companyDescription'),
        arr: formData.get('companyARR'),
        arrDisplay: getArrDisplay(formData.get('companyARR')),
        arrValue: getArrValue(formData.get('companyARR')),
        region: formData.get('companyRegion'),
        vertical: formData.get('companyVertical'),
        growth: parseInt(formData.get('companyGrowth')) || null,
        submittedBy: formData.get('submitterName'),
        submittedEmail: formData.get('submitterEmail'),
        relation: formData.get('submitterRelation')
    };
    
    // Validate ARR range
    if (!isValidARR(newCompany.arrValue)) {
        showError('Company ARR must be between $250K and $100M USD');
        return;
    }
    
    // Check for duplicates
    const isDuplicate = companies.some(company => 
        company.name.toLowerCase() === newCompany.name.toLowerCase() ||
        company.website.toLowerCase() === newCompany.website.toLowerCase()
    );
    
    if (isDuplicate) {
        showError('A company with this name or website already exists in our database');
        return;
    }
    
    // Add company to the list
    companies.push(newCompany);
    filteredCompanies = [...companies];
    
    // Update display
    updateStats();
    filterCompanies();
    
    // Show success message
    showSuccess('Company submitted successfully! It will appear in the leaderboard after review.');
    
    // Close modal after a delay
    setTimeout(() => {
        closeSubmissionModal();
    }, 2000);
}

// Helper functions
function getArrDisplay(arrRange) {
    const displays = {
        '250000-500000': '$250K - $500K',
        '500000-1000000': '$500K - $1M',
        '1000000-5000000': '$1M - $5M',
        '5000000-10000000': '$5M - $10M',
        '10000000-25000000': '$10M - $25M',
        '25000000-50000000': '$25M - $50M',
        '50000000-100000000': '$50M - $100M'
    };
    return displays[arrRange] || arrRange;
}

function getArrValue(arrRange) {
    const values = {
        '250000-500000': 375000,
        '500000-1000000': 750000,
        '1000000-5000000': 3000000,
        '5000000-10000000': 7500000,
        '10000000-25000000': 17500000,
        '25000000-50000000': 37500000,
        '50000000-100000000': 75000000
    };
    return values[arrRange] || 0;
}

function isValidARR(arrValue) {
    return arrValue >= 250000 && arrValue <= 100000000;
}

function showSuccess(message) {
    clearMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    submissionForm.insertBefore(successDiv, submissionForm.firstChild);
}

function showError(message) {
    clearMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    submissionForm.insertBefore(errorDiv, submissionForm.firstChild);
}

function clearMessages() {
    const messages = submissionForm.querySelectorAll('.success-message, .error-message');
    messages.forEach(msg => msg.remove());
}

// Export data function (for future use)
function exportData() {
    const dataStr = JSON.stringify(companies, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-first-services-leaderboard.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Search functionality (for future enhancement)
function searchCompanies(query) {
    if (!query) {
        filteredCompanies = [...companies];
    } else {
        const searchTerm = query.toLowerCase();
        filteredCompanies = companies.filter(company => 
            company.name.toLowerCase().includes(searchTerm) ||
            company.description.toLowerCase().includes(searchTerm) ||
            company.vertical.toLowerCase().includes(searchTerm) ||
            company.region.toLowerCase().includes(searchTerm)
        );
    }
    renderLeaderboard();
}
