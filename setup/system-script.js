// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.content-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    document.getElementById(`${pageId}-page`).style.display = 'block';
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Modal Management
function showNewProjectModal() {
    document.getElementById('newProjectModal').style.display = 'block';
}

function showUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

// Close modals when clicking X or outside
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Sample Projects Data


// Render Projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <i class="fas fa-folder fa-3x" style="color: var(--primary-color)"></i>
            <h3>${project.name}</h3>
            <p>Year: ${project.year}</p>
            <p>Files: ${project.uploadedFiles}/${project.requiredFiles}</p>
            <button class="btn-primary" onclick="showUploadModal()">
                <i class="fas fa-upload"></i> Upload Files
            </button>
        </div>
    `).join('');
}
// files page--------------------------------------------------------------------------------------------------------





// Sample Files Data
// Fetch files from the server
function fetchFiles() {
    fetch('list_files.php') // Ensure the PHP script is in the correct directory
        .then(response => response.json()) // Parse the JSON response
        .then(files => {
            if (Array.isArray(files)) {
                renderFiles(files); // Pass the files data to the render function
            } else {
                console.error('Error: Unexpected data format', files);
            }
        })
        .catch(error => console.error('Error fetching files:', error));
}

// Render Files
function renderFiles(files) {
    const filesList = document.querySelector('.files-list');
    filesList.innerHTML = files.map(file => `
        <div class="file-item">
            <i class="fas fa-file-alt" style="margin-right: 15px;"></i>
            <div style="flex: 1;">
                <h4>${file.name}</h4>
                <small>${file.type} • ${file.size} • ${file.date}</small>
            </div>
            <a href="Forms/${file.name}" class="btn-primary" style="margin-right: 10px;" download>
                <i class="fas fa-download"></i> Download
            </a>
        </div>
    `).join('');
}

// Run function when the page loads
document.addEventListener("DOMContentLoaded", fetchFiles);


// Download file
function downloadFile(fileName) {
    const url = `DostPHP/setup/Forms/${fileName}`;
    window.location.href = url; // Initiates the download by redirecting to the file
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchFiles); // Fetch files when the page loads






// files--------------------------------------------------------------------------------------------------------

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderFiles();
});

// File Upload Handling
const uploadArea = document.querySelector('.upload-area');
const fileInput = uploadArea.querySelector('input[type="file"]');

uploadArea.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    const files = Array.from(e.target.files);
    const fileList = document.querySelector('.file-list');
    
    fileList.innerHTML = files.map(file => `
        <div class="file-item">
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
    `).join('');
};

// Drag and Drop
uploadArea.ondragover = (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-color)';
};

uploadArea.ondragleave = () => {
    uploadArea.style.borderColor = 'var(--border-color)';
};

uploadArea.ondrop = (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));
};

// Logout function
function logout() { 
    // Redirect to the root index.html in DOSTPHP
    window.location.href = '../../index.html';
}

// ... (previous functions remain unchanged) ...

// Sample Projects Data
const projects = [
    {
        name: "Project A",
        year: "2024",
        requiredFiles: 5,
        uploadedFiles: 3
    },
    {
        name: "Project B",
        year: "2023",
        requiredFiles: 8,
        uploadedFiles: 8
    },
    {
        name: "Project C",
        year: "2024",
        requiredFiles: 6,
        uploadedFiles: 2
    },

    {
        name: "Project D",
        year: "2024",
        requiredFiles: 6,
        uploadedFiles: 6
    }
];

// Render Dashboard
function renderDashboard() {
    // Update stats
    document.getElementById('total-projects').textContent = projects.length;
    document.getElementById('total-files').textContent = projects.reduce((sum, project) => sum + project.uploadedFiles, 0);
    const completionRate = (projects.filter(p => p.uploadedFiles === p.requiredFiles).length / projects.length * 100).toFixed(0);
    document.getElementById('completion-rate').textContent = completionRate + '%';

    // Render records table
    const recordsTableBody = document.querySelector('#records-table tbody');
    recordsTableBody.innerHTML = projects.map(project => {
        const status = project.uploadedFiles === project.requiredFiles ? 'Complete' :
                       project.uploadedFiles > 0 ? 'In Progress' : 'Not Started';
        const statusClass = status.toLowerCase().replace(' ', '-');
        return `
            <tr>
                <td>${project.name}</td>
                <td>${project.year}</td>
                <td>${project.uploadedFiles}/${project.requiredFiles}</td>
                <td><span class="status-badge status-${statusClass}">${status}</span></td>
                <td>
                    <button class="btn-primary" onclick="showUploadModal()">
                        <i class="fas fa-upload"></i> Upload
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ... (rest of the functions remain unchanged) ...

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderProjects();
    renderFiles();
});

// ... (rest of the code remains unchanged) ...

