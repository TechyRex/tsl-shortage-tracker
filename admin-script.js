// admin-script.js - Dashboard Logic

// Configuration
const SHEETDB_URL = 'https://sheetdb.io/api/v1/ky6mzl5sav83s';
const CODES_SHEET_URL = 'https://sheetdb.io/api/v1/ky6mzl5sav83s?sheet=codes'; // Update with your codes sheet

// Dashboard State
let allRecords = [];
let filteredRecords = [];
let currentSection = 'overview';
let charts = {};

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    if (!isAuthenticated()) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Initialize dashboard
    initializeDashboard();
    
    // Event Listeners
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('applyFilterBtn').addEventListener('click', applyFilters);
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Load initial data
    loadDashboardData();
});

// Authentication Check
function isAuthenticated() {
    const authData = localStorage.getItem('tsl_admin_access');
    if (!authData) return false;
    
    try {
        const { code, timestamp } = JSON.parse(authData);
        // Check if login is recent (within 8 hours)
        const loginTime = new Date(timestamp);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        if (hoursDiff > 8) {
            localStorage.removeItem('tsl_admin_access');
            return false;
        }
        
        return true;
    } catch {
        return false;
    }
}

// Logout
function logout() {
    localStorage.removeItem('tsl_admin_access');
    window.location.href = 'admin-login.html';
}

// Initialize Dashboard
function initializeDashboard() {
    // Set current date in date filter
    document.getElementById('dateFilter').value = new Date().toISOString().split('T')[0];
    
    // Initialize charts
    initializeCharts();
}

// Initialize Chart.js instances
function initializeCharts() {
    // Shortage Trend Chart (Line Chart)
    const trendCtx = document.getElementById('shortageTrendChart').getContext('2d');
    charts.trend = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Shortage Value (₦)',
                data: [],
                borderColor: '#8B0000',
                backgroundColor: 'rgba(139, 0, 0, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `₦${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₦' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Product Shortage Chart (Doughnut)
    const productCtx = document.getElementById('productShortageChart').getContext('2d');
    charts.product = new Chart(productCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#8B0000', '#a52a2a', '#c0392b', '#e74c3c', '#f1948a',
                    '#16a085', '#27ae60', '#2ecc71', '#3498db', '#2980b9'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
    
    // Location Shortage Chart (Bar Chart)
    const locationCtx = document.getElementById('locationShortageChart').getContext('2d');
    charts.location = new Chart(locationCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Shortage Value',
                data: [],
                backgroundColor: '#8B0000',
                borderColor: '#a52a2a',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `₦${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₦' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Driver Shortage Chart (Horizontal Bar)
    const driverCtx = document.getElementById('driverShortageChart').getContext('2d');
    charts.driver = new Chart(driverCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Shortage Value',
                data: [],
                backgroundColor: '#8B0000',
                borderColor: '#a52a2a',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `₦${context.parsed.x.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₦' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Load Dashboard Data
async function loadDashboardData() {
    showLoading();
    
    try {
        // Fetch data from SheetDB
        const response = await fetch(SHEETDB_URL);
        allRecords = await response.json();
        
        // Filter out records with no data
        allRecords = allRecords.filter(record => 
            record.date_captured && record.status !== 'draft'
        );
        
        // Parse product data if stored as JSON string
        allRecords.forEach(record => {
            try {
                if (record.products && typeof record.products === 'string') {
                    record.products = JSON.parse(record.products);
                } else if (!record.products) {
                    record.products = [];
                }
            } catch {
                record.products = [];
            }
        });
        
        // Apply initial filters
        applyFilters();
        
        // Update dashboard stats
        updateDashboardStats();
        
        // Update charts
        updateCharts();
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Error loading dashboard data. Please check console for details.');
    } finally {
        hideLoading();
    }
}

// Apply Filters
function applyFilters() {
    const dateFilter = document.getElementById('dateFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    filteredRecords = allRecords.filter(record => {
        // Date filter
        if (dateFilter && record.loading_date !== dateFilter) {
            return false;
        }
        
        // Status filter
        if (statusFilter && record.status !== statusFilter) {
            return false;
        }
        
        return true;
    });
    
    // Update records table
    updateRecordsTable();
}

// Update Dashboard Stats
function updateDashboardStats() {
    // Total Trips
    document.getElementById('totalTrips').textContent = allRecords.length;
    
    // Total Shortage Value
    const totalShortage = allRecords.reduce((sum, record) => {
        const shortageValue = parseFloat(record.total_shortage_value) || 
                            parseFloat(record.total_actual_value) || 0;
        return sum + shortageValue;
    }, 0);
    document.getElementById('totalShortage').textContent = formatCurrency(totalShortage);
    
    // Total Unique Drivers
    const uniqueDrivers = new Set(allRecords.map(record => record.delivery_officer).filter(Boolean));
    document.getElementById('totalDrivers').textContent = uniqueDrivers.size;
    
    // Shortage Rate (records with shortage vs total)
    const recordsWithShortage = allRecords.filter(record => {
        const shortage = parseFloat(record.total_shortage_value) || 
                        parseFloat(record.total_actual_value) || 0;
        return shortage > 0;
    }).length;
    
    const shortageRate = allRecords.length > 0 ? 
        ((recordsWithShortage / allRecords.length) * 100).toFixed(1) : 0;
    document.getElementById('shortageRate').textContent = `${shortageRate}%`;
}

// Update Charts
function updateCharts() {
    // Prepare data for last 7 days
    const last7Days = getLast7Days();
    const dailyData = {};
    
    last7Days.forEach(day => {
        dailyData[day] = 0;
    });
    
    allRecords.forEach(record => {
        const date = record.loading_date || record.date_captured;
        if (date && last7Days.includes(date)) {
            const shortage = parseFloat(record.total_shortage_value) || 
                           parseFloat(record.total_actual_value) || 0;
            dailyData[date] = (dailyData[date] || 0) + shortage;
        }
    });
    
    // Update trend chart
    charts.trend.data.labels = last7Days.map(date => formatDateForDisplay(date));
    charts.trend.data.datasets[0].data = last7Days.map(date => dailyData[date] || 0);
    charts.trend.update();
    
    // Product shortage analysis
    const productShortages = {};
    allRecords.forEach(record => {
        if (Array.isArray(record.products)) {
            record.products.forEach(product => {
                if (product.product_loaded) {
                    const productName = product.product_loaded;
                    const shortageValue = parseFloat(product.actual_value) || 0;
                    productShortages[productName] = (productShortages[productName] || 0) + shortageValue;
                }
            });
        }
    });
    
    const topProducts = Object.entries(productShortages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    charts.product.data.labels = topProducts.map(([name]) => truncateText(name, 20));
    charts.product.data.datasets[0].data = topProducts.map(([,value]) => value);
    charts.product.update();
    
    // Location shortage analysis
    const locationShortages = {};
    allRecords.forEach(record => {
        const location = record.loading_point;
        if (location) {
            const shortage = parseFloat(record.total_shortage_value) || 
                           parseFloat(record.total_actual_value) || 0;
            locationShortages[location] = (locationShortages[location] || 0) + shortage;
        }
    });
    
    charts.location.data.labels = Object.keys(locationShortages);
    charts.location.data.datasets[0].data = Object.values(locationShortages);
    charts.location.update();
    
    // Driver shortage analysis (Top 10)
    const driverShortages = {};
    allRecords.forEach(record => {
        const driver = record.delivery_officer;
        if (driver) {
            const shortage = parseFloat(record.total_shortage_value) || 
                           parseFloat(record.total_actual_value) || 0;
            driverShortages[driver] = (driverShortages[driver] || 0) + shortage;
        }
    });
    
    const topDrivers = Object.entries(driverShortages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    charts.driver.data.labels = topDrivers.map(([name]) => truncateText(name, 15));
    charts.driver.data.datasets[0].data = topDrivers.map(([,value]) => value);
    charts.driver.update();
}

// Update Records Table
function updateRecordsTable() {
    const tbody = document.getElementById('recordsTableBody');
    tbody.innerHTML = '';
    
    // Sort by date (newest first)
    const sortedRecords = [...filteredRecords].sort((a, b) => {
        const dateA = new Date(a.loading_date || a.date_captured);
        const dateB = new Date(b.loading_date || b.date_captured);
        return dateB - dateA;
    });
    
    // Show only recent 20 records
    const displayRecords = sortedRecords.slice(0, 20);
    
    displayRecords.forEach(record => {
        const row = document.createElement('tr');
        
        // Calculate product count
        let productCount = 0;
        let productNames = [];
        
        if (Array.isArray(record.products)) {
            productCount = record.products.length;
            productNames = record.products.map(p => p.product_loaded).filter(Boolean);
        }
        
        // Calculate shortage value
        const shortageValue = parseFloat(record.total_shortage_value) || 
                            parseFloat(record.total_actual_value) || 0;
        
        row.innerHTML = `
            <td>${formatDateForDisplay(record.loading_date || record.date_captured)}</td>
            <td>${record.delivery_officer || 'N/A'}</td>
            <td>${record.truck_no || 'N/A'}</td>
            <td>${record.loading_point || 'N/A'}</td>
            <td>
                ${productCount} products
                ${productNames.length > 0 ? 
                    `<br><small>${truncateText(productNames.join(', '), 30)}</small>` : ''}
            </td>
            <td><strong>${formatCurrency(shortageValue)}</strong></td>
            <td>
                <span class="status-badge ${record.status === 'submitted' ? 'status-submitted' : 'status-draft'}">
                    ${record.status || 'draft'}
                </span>
            </td>
            <td>
                <button class="view-btn" onclick="viewRecord('${record.id || ''}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="edit-btn" onclick="editRecord('${record.id || ''}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteRecord('${record.id || ''}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Update table message if no records
    if (displayRecords.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="8" style="text-align: center; padding: 2rem;">
                <i class="fas fa-database" style="font-size: 2rem; color: #ccc; margin-bottom: 1rem;"></i>
                <p>No records found</p>
            </td>
        `;
        tbody.appendChild(emptyRow);
    }
}

// Switch Section
function switchSection(section) {
    // Update active navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.nav-item[data-section="${section}"]`).classList.add('active');
    
    // Update page title
    const pageTitle = document.querySelector('.page-title');
    const titles = {
        'overview': 'Dashboard Overview',
        'records': 'All Records',
        'drivers': 'Driver Analysis',
        'products': 'Product Analysis',
        'locations': 'Location Analysis',
        'reports': 'Reports',
        'settings': 'Settings'
    };
    pageTitle.textContent = titles[section] || 'Dashboard';
    
    currentSection = section;
    
    // Show/hide sections
    document.querySelectorAll('[data-section-content]').forEach(el => {
        el.style.display = el.getAttribute('data-section-content') === section ? 'block' : 'none';
    });
    
    // Load section-specific data
    if (section === 'records') {
        // Already loaded by updateRecordsTable
    } else if (section === 'drivers') {
        loadDriverAnalysis();
    } else if (section === 'products') {
        loadProductAnalysis();
    } else if (section === 'locations') {
        loadLocationAnalysis();
    } else if (section === 'reports') {
        loadReports();
    }
}

// Load Driver Analysis
function loadDriverAnalysis() {
    // Create driver analysis table if it doesn't exist
    if (!document.getElementById('driverAnalysisTable')) {
        const content = document.querySelector('.main-content');
        const analysisHTML = `
            <div class="data-table-container" data-section-content="drivers">
                <div class="table-header">
                    <h3 class="table-title">Driver Performance Analysis</h3>
                    <div class="table-controls">
                        <select id="driverSortBy" class="filter-input">
                            <option value="shortage">Shortage Value</option>
                            <option value="trips">Number of Trips</option>
                            <option value="name">Driver Name</option>
                        </select>
                        <button class="filter-btn" onclick="sortDriverAnalysis()">
                            <i class="fas fa-sort"></i> Sort
                        </button>
                        <button class="filter-btn" onclick="exportDriverReport()" style="background: #28a745;">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="data-table" id="driverAnalysisTable">
                        <thead>
                            <tr>
                                <th>Driver Name</th>
                                <th>Staff ID</th>
                                <th>Total Trips</th>
                                <th>Total Loaded Value</th>
                                <th>Total Shortage Value</th>
                                <th>Shortage Rate</th>
                                <th>Average Shortage/Trip</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="driverAnalysisBody">
                            <!-- Driver data will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        // Add after the existing content
        content.insertAdjacentHTML('beforeend', analysisHTML);
    }
    
    // Calculate driver statistics
    const driverStats = {};
    
    allRecords.forEach(record => {
        const driver = record.delivery_officer;
        const staffId = record.staff_id;
        
        if (!driver) return;
        
        if (!driverStats[driver]) {
            driverStats[driver] = {
                staffId: staffId,
                trips: 0,
                totalLoaded: 0,
                totalShortage: 0,
                shortageTrips: 0
            };
        }
        
        driverStats[driver].trips++;
        
        // Calculate loaded value from products
        if (Array.isArray(record.products)) {
            record.products.forEach(product => {
                const loadedQty = parseFloat(product.qty_loaded) || 0;
                const skuPrice = parseFloat(product.sku_price) || 0;
                driverStats[driver].totalLoaded += loadedQty * skuPrice;
            });
        }
        
        const shortage = parseFloat(record.total_shortage_value) || 
                        parseFloat(record.total_actual_value) || 0;
        driverStats[driver].totalShortage += shortage;
        
        if (shortage > 0) {
            driverStats[driver].shortageTrips++;
        }
    });
    
    // Update table
    const tbody = document.getElementById('driverAnalysisBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    Object.entries(driverStats).forEach(([driver, stats]) => {
        const shortageRate = stats.trips > 0 ? (stats.shortageTrips / stats.trips * 100).toFixed(1) : 0;
        const avgShortage = stats.trips > 0 ? stats.totalShortage / stats.trips : 0;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${driver}</strong></td>
            <td>${stats.staffId || 'N/A'}</td>
            <td>${stats.trips}</td>
            <td>${formatCurrency(stats.totalLoaded)}</td>
            <td><strong style="color: #8B0000;">${formatCurrency(stats.totalShortage)}</strong></td>
            <td>${shortageRate}%</td>
            <td>${formatCurrency(avgShortage)}</td>
            <td>
                ${shortageRate > 30 ? 
                    '<span style="color: #dc3545; font-weight: bold;">⚠️ High Risk</span>' :
                    shortageRate > 10 ?
                    '<span style="color: #ffc107; font-weight: bold;">⚠️ Medium Risk</span>' :
                    '<span style="color: #28a745; font-weight: bold;">✓ Low Risk</span>'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Sort Driver Analysis
function sortDriverAnalysis() {
    const sortBy = document.getElementById('driverSortBy').value;
    const tbody = document.getElementById('driverAnalysisBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aCells = a.querySelectorAll('td');
        const bCells = b.querySelectorAll('td');
        
        switch(sortBy) {
            case 'shortage':
                const aShortage = parseFloat(aCells[4].textContent.replace(/[^0-9.-]+/g, ''));
                const bShortage = parseFloat(bCells[4].textContent.replace(/[^0-9.-]+/g, ''));
                return bShortage - aShortage;
                
            case 'trips':
                const aTrips = parseInt(aCells[2].textContent);
                const bTrips = parseInt(bCells[2].textContent);
                return bTrips - aTrips;
                
            case 'name':
                return aCells[0].textContent.localeCompare(bCells[0].textContent);
                
            default:
                return 0;
        }
    });
    
    // Reorder rows
    rows.forEach(row => tbody.appendChild(row));
}

// Export Driver Report
function exportDriverReport() {
    const headers = ['Driver Name', 'Staff ID', 'Total Trips', 'Total Loaded Value', 'Total Shortage Value', 'Shortage Rate', 'Average Shortage/Trip', 'Status'];
    const rows = [];
    
    document.querySelectorAll('#driverAnalysisBody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => cell.textContent.trim());
        rows.push(rowData);
    });
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `driver-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// Load Product Analysis (similar to driver analysis)
function loadProductAnalysis() {
    // Implementation similar to loadDriverAnalysis
    console.log('Loading product analysis...');
}

// Load Location Analysis (similar to driver analysis)
function loadLocationAnalysis() {
    // Implementation similar to loadDriverAnalysis
    console.log('Loading location analysis...');
}

// Load Reports
function loadReports() {
    // Create reports section if it doesn't exist
    if (!document.getElementById('reportsSection')) {
        const content = document.querySelector('.main-content');
        const reportsHTML = `
            <div class="reports-container" id="reportsSection" data-section-content="reports">
                <div class="data-table-container">
                    <h3 class="table-title">Generate Reports</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                        <div class="report-card" onclick="generateDailyReport()">
                            <div class="report-icon">
                                <i class="fas fa-calendar-day"></i>
                            </div>
                            <h4>Daily Shortage Report</h4>
                            <p>Generate daily shortage summary report</p>
                        </div>
                        
                        <div class="report-card" onclick="generateDriverReport()">
                            <div class="report-icon">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <h4>Driver Performance Report</h4>
                            <p>Detailed driver shortage analysis</p>
                        </div>
                        
                        <div class="report-card" onclick="generateProductReport()">
                            <div class="report-icon">
                                <i class="fas fa-boxes"></i>
                            </div>
                            <h4>Product Analysis Report</h4>
                            <p>Product-wise shortage analysis</p>
                        </div>
                        
                        <div class="report-card" onclick="generateLocationReport()">
                            <div class="report-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <h4>Location Analysis Report</h4>
                            <p>Branch-wise shortage analysis</p>
                        </div>
                        
                        <div class="report-card" onclick="generateMonthlyReport()">
                            <div class="report-icon">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h4>Monthly Summary Report</h4>
                            <p>Monthly shortage trends and analysis</p>
                        </div>
                        
                        <div class="report-card" onclick="generateCustomReport()">
                            <div class="report-icon">
                                <i class="fas fa-cog"></i>
                            </div>
                            <h4>Custom Report</h4>
                            <p>Generate custom report with filters</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        content.insertAdjacentHTML('beforeend', reportsHTML);
        
        // Add report card styles
        const style = document.createElement('style');
        style.textContent = `
            .report-card {
                background: white;
                border-radius: var(--radius);
                padding: 1.5rem;
                box-shadow: var(--shadow);
                cursor: pointer;
                transition: all 0.3s;
                border: 2px solid transparent;
            }
            
            .report-card:hover {
                transform: translateY(-5px);
                border-color: var(--tsl-red);
                box-shadow: 0 10px 20px rgba(139, 0, 0, 0.1);
            }
            
            .report-icon {
                width: 60px;
                height: 60px;
                background: rgba(139, 0, 0, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: var(--tsl-red);
                margin-bottom: 1rem;
            }
            
            .report-card h4 {
                color: var(--tsl-red);
                margin-bottom: 0.5rem;
            }
            
            .report-card p {
                color: #666;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility Functions
function formatCurrency(amount) {
    return '₦' + amount.toLocaleString('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatDateForDisplay(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toISOString().split('T')[0]);
    }
    return days;
}

function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Record Actions (to be implemented)
function viewRecord(recordId) {
    alert(`View record ${recordId} - To be implemented`);
    // Open modal with record details
}

function editRecord(recordId) {
    alert(`Edit record ${recordId} - To be implemented`);
    // Open form with record data for editing
}

function deleteRecord(recordId) {
    if (confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
        alert(`Delete record ${recordId} - To be implemented`);
        // Implement delete functionality
    }
}

// Report Generation Functions (to be implemented)
function generateDailyReport() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        alert('Daily report generated successfully!');
        // Implement actual report generation
    }, 1000);
}

function generateDriverReport() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        alert('Driver report generated successfully!');
        // Implement actual report generation
    }, 1000);
}

function generateProductReport() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        alert('Product report generated successfully!');
        // Implement actual report generation
    }, 1000);
}

function generateLocationReport() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        alert('Location report generated successfully!');
        // Implement actual report generation
    }, 1000);
}

function generateMonthlyReport() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        alert('Monthly report generated successfully!');
        // Implement actual report generation
    }, 1000);
}

function generateCustomReport() {
    const startDate = prompt('Enter start date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    const endDate = prompt('Enter end date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    
    if (startDate && endDate) {
        showLoading();
        setTimeout(() => {
            hideLoading();
            alert(`Custom report generated for ${startDate} to ${endDate}!`);
            // Implement actual report generation with date filters
        }, 1000);
    }
}

// Make functions available globally
window.viewRecord = viewRecord;
window.editRecord = editRecord;
window.deleteRecord = deleteRecord;
window.sortDriverAnalysis = sortDriverAnalysis;
window.exportDriverReport = exportDriverReport;
window.generateDailyReport = generateDailyReport;
window.generateDriverReport = generateDriverReport;
window.generateProductReport = generateProductReport;
window.generateLocationReport = generateLocationReport;
window.generateMonthlyReport = generateMonthlyReport;
window.generateCustomReport = generateCustomReport;
