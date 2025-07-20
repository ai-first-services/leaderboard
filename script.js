// DOM elements
const leaderboardBody = document.getElementById('leaderboard-body');
const submissionModal = document.getElementById('submissionModal');
const definitionModal = document.getElementById('definitionModal');
const submissionForm = document.getElementById('submissionForm');
const regionFilter = document.getElementById('regionFilter');
const verticalFilter = document.getElementById('verticalFilter');
const typeFilter = document.getElementById('typeFilter');
const timeFilter = document.getElementById('timeFilter');

// Global variables
let companies = [];
let filteredCompanies = [];

// Sample data for demonstration
const sampleData = [
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
        relation: "Industry Observer",
        entityType: "Company",
        submittedDate: "2024-12-01T00:00:00.000Z",
        featured: true
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
        relation: "Customer",
        entityType: "Company",
        submittedDate: "2024-11-15T00:00:00.000Z",
        featured: false
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
        relation: "Founder/CEO",
        entityType: "Company",
        submittedDate: "2024-10-20T00:00:00.000Z",
        featured: false
    },
    {
        id: 4,
        name: "Alex Chen",
        website: "https://alexchen-ai.com",
        description: "Specialized AI agent for legal document processing and contract analysis",
        arr: "500000-1000000",
        arrDisplay: "$500K - $1M",
        arrValue: 750000,
        region: "Asia Pacific",
        vertical: "Legal Services",
        growth: 156,
        submittedBy: "Alex Chen",
        submittedEmail: "alex@alexchen-ai.com",
        relation: "Founder/CEO",
        entityType: "AI Agent",
        submittedDate: "2024-12-10T00:00:00.000Z",
        featured: false
    },
    {
        id: 5,
        name: "DataPod Analytics",
        website: "https://datapod.io",
        description: "Autonomous AI pod for real-time data analysis and business intelligence",
        arr: "1000000-5000000",
        arrDisplay: "$1M - $5M",
        arrValue: 2500000,
        region: "North America",
        vertical: "Professional Services",
        growth: 189,
        submittedBy: "Sarah Kim",
        submittedEmail: "sarah@datapod.io",
        relation: "Employee",
        entityType: "AI Pod",
        submittedDate: "2025-01-05T00:00:00.000Z",
        featured: true
    }
];

// Modal functions
function openSubmissionModal() {
    submissionModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeSubmissionModal() {
    submissionModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    submissionForm.reset();
    clearMessages();
}

function openDefinitionModal() {
    definitionModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeDefinitionModal() {
    definitionModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Form field toggle
function toggleFormFields() {
    const submissionType = document.getElementById('submissionType').value;
    const entityTypeField = document.getElementById('entityTypeField');
    const entityType = document.getElementById('entityType');
    
    if (submissionType === 'individual') {
        entityTypeField.style.display = 'block';
        entityType.innerHTML = `
            <option value="">Select Type</option>
            <option value="AI Agent">AI Agent</option>
            <option value="AI Pod">AI Pod</option>
            <option value="AI Worker">AI Worker</option>
        `;
    } else {
        entityTypeField.style.display = 'none';
        entityType.innerHTML = '<option value="Company">Company</option>';
    }
}

// Filter companies based on selected criteria
function filterCompanies() {
    const selectedRegion = regionFilter?.value || '';
    const selectedVertical = verticalFilter?.value || '';
    const selectedType = typeFilter?.value || '';
    const selectedTime = timeFilter?.value || '';
    
    filteredCompanies = companies.filter(company => {
        const regionMatch = !selectedRegion || company.region === selectedRegion;
        const verticalMatch = !selectedVertical || company.vertical === selectedVertical;
        const typeMatch = !selectedType || company.entityType === selectedType;
        const timeMatch = !selectedTime || checkTimeMatch(company, selectedTime);
        
        return regionMatch && verticalMatch && typeMatch && timeMatch;
    });
    
    renderLeaderboard();
}

function checkTimeMatch(company, timeFilter) {
    const now = new Date();
    const submitDate = new Date(company.submittedDate || now);
    
    switch(timeFilter) {
        case 'week':
            return (now - submitDate) <= (7 * 24 * 60 * 60 * 1000);
        case 'month':
            return (now - submitDate) <= (30 * 24 * 60 * 60 * 1000);
        case 'quarter':
            return (now - submitDate) <= (90 * 24 * 60 * 60 * 1000);
        case 'year':
            return (now - submitDate) <= (365 * 24 * 60 * 60 * 1000);
        default:
            return true;
    }
}

// Render the leaderboard
function renderLeaderboard() {
    if (filteredCompanies.length === 0) {
        leaderboardBody.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-gray-500">
                <i data-lucide="search" class="w-12 h-12 mb-4 opacity-50"></i>
                <p class="text-lg font-medium mb-2">No entries found</p>
                <p class="text-sm">Try adjusting your filters or submit a new entry!</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    leaderboardBody.innerHTML = filteredCompanies.map((company, index) => `
        <div class="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-4 flex-1">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        #${index + 1}
                    </div>
                </div>
                
                <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-3 mb-2">
                        <h4 class="text-lg font-semibold text-gray-900 truncate">${company.name}</h4>
                        ${company.entityType !== 'Company' ? `
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                ${company.entityType}
                            </span>
                        ` : ''}
                        ${company.featured ? `
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                <i data-lucide="star" class="w-3 h-3 mr-1"></i>
                                Featured
                            </span>
                        ` : ''}
                    </div>
                    
                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">${company.description}</p>
                    
                    <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <a href="${company.website}" target="_blank" class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                            <i data-lucide="external-link" class="w-4 h-4 mr-1"></i>
                            ${company.website.replace('https://', '').replace('http://', '')}
                        </a>
                        <span class="inline-flex items-center">
                            <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>
                            ${company.region}
                        </span>
                        <span class="inline-flex items-center">
                            <i data-lucide="building" class="w-4 h-4 mr-1"></i>
                            ${company.vertical}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="flex-shrink-0 text-right ml-6">
                <div class="text-lg font-bold text-gray-900 mb-1">${company.arrDisplay}</div>
                ${company.growth ? `<div class="text-sm text-green-600 font-medium">+${company.growth}% YoY</div>` : ''}
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Update statistics
function updateStats() {
    const totalCompanies = companies.filter(c => c.entityType === 'Company' || !c.entityType).length;
    const totalIndividuals = companies.filter(c => c.entityType === 'AI Agent' || c.entityType === 'AI Pod' || c.entityType === 'AI Worker').length;
    const totalRegions = [...new Set(companies.map(c => c.region))].length;
    const avgGrowth = Math.round(companies.reduce((sum, c) => sum + (c.growth || 0), 0) / companies.length);
    
    document.getElementById('totalCompanies').textContent = totalCompanies;
    document.getElementById('totalIndividuals').textContent = totalIndividuals;
    document.getElementById('totalRegions').textContent = totalRegions;
    document.getElementById('avgGrowth').textContent = avgGrowth + '%';
}

// Form submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = {
        submissionType: document.getElementById('submissionType').value,
        entityName: document.getElementById('entityName').value,
        entityType: document.getElementById('entityType').value,
        website: document.getElementById('website').value,
        description: document.getElementById('description').value,
        entityARR: document.getElementById('entityARR').value,
        region: document.getElementById('region').value,
        vertical: document.getElementById('vertical').value,
        growth: parseInt(document.getElementById('growth').value) || 0,
        submittedBy: document.getElementById('submittedBy').value,
        submittedEmail: document.getElementById('submittedEmail').value,
        relation: document.getElementById('relation').value
    };
    
    // Validate required fields
    const requiredFields = ['entityName', 'website', 'description', 'entityARR', 'region', 'vertical', 'submittedBy', 'submittedEmail', 'relation'];
    for (let field of requiredFields) {
        if (!formData[field]) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
    }
    
    // Create new entry
    const newEntry = {
        id: companies.length + 1,
        name: formData.entityName,
        entityType: formData.entityType || 'Company',
        website: formData.website,
        description: formData.description,
        arr: formData.entityARR,
        arrDisplay: getArrDisplay(formData.entityARR),
        arrValue: getArrValue(formData.entityARR),
        region: formData.region,
        vertical: formData.vertical,
        growth: formData.growth,
        submittedBy: formData.submittedBy,
        submittedEmail: formData.submittedEmail,
        relation: formData.relation,
        submittedDate: new Date().toISOString(),
        featured: false
    };
    
    // Add to companies array
    companies.push(newEntry);
    
    // Update display
    updateStats();
    filterCompanies();
    
    showMessage('Thank you for your submission! Your entry has been added to the leaderboard.', 'success');
    
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

function showMessage(message, type) {
    const container = document.getElementById('message-container');
    container.className = `p-4 rounded-lg ${type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`;
    container.textContent = message;
    container.classList.remove('hidden');
    
    if (type === 'success') {
        setTimeout(() => {
            container.classList.add('hidden');
        }, 3000);
    }
}

function clearMessages() {
    const container = document.getElementById('message-container');
    container.classList.add('hidden');
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === submissionModal) {
        closeSubmissionModal();
    }
    if (event.target === definitionModal) {
        closeDefinitionModal();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    companies = [...sampleData];
    filteredCompanies = [...companies];
    
    // Setup event listeners
    if (submissionForm) {
        submissionForm.addEventListener('submit', handleFormSubmission);
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', filterCompanies);
    }
    
    if (verticalFilter) {
        verticalFilter.addEventListener('change', filterCompanies);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterCompanies);
    }
    
    if (timeFilter) {
        timeFilter.addEventListener('change', filterCompanies);
    }
    
    // Initialize form fields
    toggleFormFields();
    
    // Initial render
    updateStats();
    renderLeaderboard();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
