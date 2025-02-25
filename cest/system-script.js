// Sample data

// Utility functions
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// Fixed document list
/*
const fixedDocuments = [
    "Letter of Intent (LOI)", "TNA Form 1", "TNA Form 2", "RRA Form 3",
    "TNA Form 4", "SB Reso / Sec Certificate", "Registration",
    "Memorandum of Agreement", "DV (Delivery Verification)", "Property Acknowledgement Receipt",
    "1st Progress Report", "2nd Progress Report", "Completion Report",
    "Request for Transfer of Ownership", "PM-TO-SS-5-23-14-F1", "PM-TO-ISS-05-14-F2",
    "Approval of Request for Transfer", "On Process on Transfer",
    "Fully Transferred the Equipment/With Property Transfer Report"
];*/
const fixedDocuments = [
    "1. Letter of Intent",
    "2. TNA 1",
    "3. TNA 2",
    "4. TNA Form 3",
    "5. TNA Form 4",
    "6. Project Proposal",
    "7. PSTD-Endorsement of Project Proposal",
   " 8. DOST-III TEC Endorsement",
    "9. Notice of Approval",
    "10. Memorandum of Agreement",
    "11. Property Acknowledgement Receipt",
    "12. 1st Progress Report",
    "13. 2nd Progress Report",
    "14. Completion Report",
    "15. Letter of request for transfer",
    "16. PM Form 1",
    "17. PM Form 2",
    "18. Approval of Transfer",
    "19. Property Transfer Report",
    "20. Journal Entry Voucher",
    "21. Deed of Donation and Certificate of Acceptance",
    
];



const statusOptions = ["For Deployment", "For Implementation", "For Monitoring", "For Transfer", "For Pullout", "Done"];

// Page navigation
function showPage(pageId, projectId = null) {
    $$('.content-page').forEach(page => page.style.display = 'none');
    $(`#${pageId}-page`).style.display = 'block';
    
    $$('.nav-item').forEach(item => item.classList.remove('active'));
    
    if (pageId === 'project-details' && projectId) {
        renderProjectDetails(projectId);
    } else {
        event.currentTarget.classList.add('active');
    }
}
//delete proyekto
function deleteProject(projectId) {
    Swal.fire({
        title: "Are you sure?",
        text: "This will permanently delete the project and all related files!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch("project_manager/delete_project.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `projectId=${encodeURIComponent(projectId)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Project has been removed successfully.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });

                    // ✅ Update UI without refresh
                    fetchProjects();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: data.error || "Failed to delete project.",
                        icon: "error"
                    });
                }
            })
            .catch(error => {
                console.error("❌ Delete error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Delete failed. Please try again.",
                    icon: "error"
                });
            });
        }
    });
}



function filterProjectsPage() {
    console.log("🔍 Projects Page Filter Triggered!");

    const searchQuery = document.getElementById("projects-search-input").value.toLowerCase();
    const selectedYear = document.getElementById("projects-year-filter").value;

    console.log(`🔍 Searching for: "${searchQuery}", Year: "${selectedYear}"`);

    // ✅ Filter projects for Projects Page
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery);
        const matchesYear = selectedYear === "" || String(project.year) === selectedYear;
        return matchesSearch && matchesYear;
    });

    console.log("📂 Filtered Projects for Projects Page:", filteredProjects);

    // ✅ Ensure only the Projects Page updates
    if (document.getElementById("projects-page").style.display !== "none") {
        console.log("📌 Updating projects page...");
        renderProjects(filteredProjects);
    }
}





// Function to show any modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

//create PROJECTT
// ✅ Populate year dropdown when the modal opens
function populateYearDropdown() {
    const projectYearInput = document.getElementById('project-year-input');

    if (projectYearInput) {
        const fixedYears = ["2019", "2020", "2021", "2022", "2023", "2024"]; // ✅ Explicitly include 2023-2024
        const currentYear = new Date().getFullYear();

        // ✅ Combine fixed years + latest year (avoiding duplicates)
        const allYears = [...new Set([...fixedYears, currentYear.toString()])];

        // ✅ Sort years (latest first)
        allYears.sort((a, b) => b - a);

        projectYearInput.innerHTML = ''; // Clear old options
        allYears.forEach(year => {
            projectYearInput.innerHTML += `<option value="${year}">${year}</option>`;
        });

        // ✅ Select latest year by default
        projectYearInput.value = currentYear.toString();
    }
}

// ✅ Open modal & populate year dropdown
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';

    if (modalId === 'newProjectModal') {
        populateYearDropdown(); // ✅ Ensure year dropdown is updated
    }
}

// ✅ Create new project with selected year
function createProject() {
    const projectName = document.getElementById('project-name-input').value.trim();
    const projectYear = document.getElementById('project-year-input').value.trim();

    if (!projectName || !projectYear) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'All fields are required!',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    const formData = new FormData();
    formData.append('name', projectName);
    formData.append('year', projectYear);

    fetch('project_manager/add_project.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Project Created!',
                text: 'Project created successfully!',
                timer: 2000,
                showConfirmButton: false
            });

            document.getElementById('newProjectModal').style.display = 'none';
            fetchProjects(); // Refresh project list dynamically
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Creation Failed!',
                text: `Failed to create project: ${data.error}`,
                timer: 2500,
                showConfirmButton: false
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Unexpected Error!',
            text: 'An error occurred while creating the project.',
            timer: 2500,
            showConfirmButton: false
        });
    });
}



function showUploadModal() {
    $('#uploadModal').style.display = 'block';
}


// Close modals when clicking X or outside
$$('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
function fetchProjects() {
    fetch('project_manager/fetch_projects.php')
    .then(response => response.json())
    .then(data => {
        projects = data;

        // ✅ Ensure year dropdowns exist
        const dashboardYearFilter = document.getElementById("dashboard-year-filter");
        const projectsYearFilter = document.getElementById("projects-year-filter");

        if (dashboardYearFilter && projectsYearFilter) {
            // 🔢 Define fixed years + current year dynamically
            const currentYear = new Date().getFullYear();
            const fixedYears = [2019, 2020, 2021, 2022, 2023, 2024]; // Ensure these are always included
            const uniqueYears = [...new Set([...fixedYears, ...projects.map(p => parseInt(p.year)), currentYear])].sort((a, b) => b - a);

            // ✅ Populate dropdowns
            dashboardYearFilter.innerHTML = '<option value="">All Years</option>';
            projectsYearFilter.innerHTML = '<option value="">All Years</option>';

            uniqueYears.forEach(year => {
                dashboardYearFilter.innerHTML += `<option value="${year}">${year}</option>`;
                projectsYearFilter.innerHTML += `<option value="${year}">${year}</option>`;
            });

            console.log("📅 Available Years:", uniqueYears); // ✅ Debugging
        }

        // ✅ Render pages separately
        renderDashboard();
        renderProjects();
    })
    .catch(error => console.error("❌ Error fetching projects:", error));
}



let projects = []; // Store projects globally

//filter projects
function filterProjects() {
    console.log("🔍 Dashboard Filter Triggered!");

    const searchQuery = document.getElementById("dashboard-search-input").value.toLowerCase();
    const selectedYear = document.getElementById("dashboard-year-filter").value;

    console.log(`🔍 Searching for: "${searchQuery}", Year: "${selectedYear}"`);

    // ✅ Filter projects for Dashboard
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery);
        const matchesYear = selectedYear === "" || String(project.year) === selectedYear;
        return matchesSearch && matchesYear;
    });

    console.log("📊 Filtered Projects for Dashboard:", filteredProjects);

    // ✅ Update only Dashboard
    if (document.getElementById("dashboard-page").style.display !== "none") {
        renderDashboard(filteredProjects, true);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const yearFilter = document.getElementById("year-filter");

    if (searchInput) {
        console.log("✅ Search input found!");
        searchInput.addEventListener("keyup", filterProjects);
    } else {
        console.warn("⚠ Search input not found!");
    }

    if (yearFilter) {
        console.log("✅ Year filter found!");
        yearFilter.addEventListener("change", filterProjects);
    } else {
        console.warn("⚠ Year filter not found!");
    }

    fetchProjects(); // Load projects on page load
});


// Fetch projects from database
function renderProjects(projectList = projects) { 
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';

    if (projectList.length === 0) {
        projectsGrid.innerHTML = '<p>No projects found.</p>';
        return;
    }

    projectList.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.setAttribute('data-id', project.id);

        projectCard.innerHTML = `
            <button class="delete-icon" onclick="deleteProject(${project.id})">
                <i class="fas fa-trash-alt"></i>
            </button>

            <i class="fas fa-folder fa-3x" style="color: var(--primary-color)"></i>

            <h3 id="project-name-${project.id}">
                <span class="project-name-text">${project.name}</span>
                <input type="text" class="edit-project-input" id="edit-input-${project.id}" 
                    value="${project.name}" style="display: none;">
            </h3>

            <p>
                Year: <span id="project-year-${project.id}">${project.year}</span>
                <select id="edit-year-${project.id}" style="display: none;">
                    ${generateYearOptions(project.year)}
                </select>
            </p>

            <p>Files: ${project.uploadedFiles}/${fixedDocuments.length}</p>

            <button class="btn-primary" onclick="showPage('project-details', ${project.id})">
                <i class="fas fa-eye"></i> View Details
            </button>

            <button class="btn-secondary edit-btn" onclick="toggleEditProject(${project.id})">
                <i class="fas fa-edit"></i>Edit    
            </button>

            <button class="btn-success save-btn" onclick="updateProjectDetails(${project.id})" 
                style="display: none;">
                <i class="fas fa-save"></i> Save    
            </button>
        `;
        projectsGrid.appendChild(projectCard);
    });
}
function toggleEditProject(projectId) {
    const nameText = document.querySelector(`#project-name-${projectId} .project-name-text`);
    const nameInput = document.getElementById(`edit-input-${projectId}`);
    const yearText = document.getElementById(`project-year-${projectId}`);
    const yearDropdown = document.getElementById(`edit-year-${projectId}`);
    const editBtn = document.querySelector(`#project-name-${projectId} ~ .edit-btn`);
    const saveBtn = document.querySelector(`#project-name-${projectId} ~ .save-btn`);

    // Toggle visibility
    const isEditing = nameInput.style.display === "none";

    nameText.style.display = isEditing ? "none" : "inline";
    nameInput.style.display = isEditing ? "inline" : "none";

    yearText.style.display = isEditing ? "none" : "inline";
    yearDropdown.style.display = isEditing ? "inline" : "none";

    editBtn.style.display = isEditing ? "none" : "inline-block";
    saveBtn.style.display = isEditing ? "inline-block" : "none";
}
function generateYearOptions(selectedYear) {
    const currentYear = new Date().getFullYear();
    let options = '';

    for (let year = 2019; year <= currentYear; year++) {
        options += `<option value="${year}" ${year == selectedYear ? 'selected' : ''}>${year}</option>`;
    }

    return options;
}


//edit projects
function toggleEditProject(projectId) {
    const nameText = document.querySelector(`#project-name-${projectId} .project-name-text`);
    const nameInput = document.getElementById(`edit-input-${projectId}`);
    const yearText = document.getElementById(`project-year-${projectId}`);
    const yearDropdown = document.getElementById(`edit-year-${projectId}`);
    const editBtn = document.querySelector(`#project-name-${projectId} ~ .edit-btn`);
    const saveBtn = document.querySelector(`#project-name-${projectId} ~ .save-btn`);

    console.log("🔍 Debugging toggleEditProject:");
    console.log("📌 Name Text:", nameText);
    console.log("📌 Name Input:", nameInput);
    console.log("📌 Year Text:", yearText);
    console.log("📌 Year Dropdown:", yearDropdown);
    console.log("📌 Edit Button:", editBtn);
    console.log("📌 Save Button:", saveBtn);

    if (!nameText || !nameInput || !yearText || !yearDropdown) {
        console.error("❌ Missing elements! Check IDs.");
        return;
    }

    // Toggle visibility
    const isEditing = nameInput.style.display === "none";

    nameText.style.display = isEditing ? "none" : "inline";
    nameInput.style.display = isEditing ? "inline" : "none";

    yearText.style.display = isEditing ? "none" : "inline";
    yearDropdown.style.display = isEditing ? "inline" : "none";

    editBtn.style.display = isEditing ? "none" : "inline-block";
    saveBtn.style.display = isEditing ? "inline-block" : "none";
}


//edit proyekto pangalan
function updateProjectDetails(projectId) {
    const newProjectName = document.getElementById(`edit-input-${projectId}`).value.trim();
    const newProjectYear = document.getElementById(`edit-year-${projectId}`).value;

    if (!newProjectName || !newProjectYear) {
        Swal.fire("Error", "Project name and year cannot be empty!", "error");
        return;
    }

    fetch("project_manager/update_project_name.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `projectId=${encodeURIComponent(projectId)}&newProjectName=${encodeURIComponent(newProjectName)}&newProjectYear=${encodeURIComponent(newProjectYear)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire("Success", "Project details updated!", "success");

            // ✅ Update UI dynamically
            document.querySelector(`#project-name-${projectId} .project-name-text`).textContent = newProjectName;
            document.querySelector(`#project-year-${projectId}`).textContent = newProjectYear;

            toggleEditProject(projectId);
            fetchProjects(); // Refresh project list dynamically
        } else {
            Swal.fire("Error", data.error || "Failed to update project details.", "error");
        }
    })
    .catch(error => {
        console.error("Update error:", error);
        Swal.fire("Error", "An unexpected error occurred.", "error");
    });
}


// Utility function for element selection
function $(selector) {
    return document.querySelector(selector);
}

// Render Dashboard
function renderDashboard(projectList = projects, isFiltered = false) {
    // ✅ Keep original total count even when filtering
    if (!isFiltered) {
        document.getElementById('total-projects').textContent = projects.length;
        document.getElementById('total-files').textContent = projects.reduce((sum, project) => sum + Number(project.uploadedFiles), 0);

        // 🔢 Calculate Total Completion Rate
        const totalUploadedFiles = projects.reduce((sum, project) => sum + Number(project.uploadedFiles), 0);
        const totalRequiredFiles = projects.length * fixedDocuments.length;
        const totalCompletionRate = totalRequiredFiles > 0 ? ((totalUploadedFiles / totalRequiredFiles) * 100).toFixed(0) : 0;

        document.getElementById('completion-rate').textContent = totalCompletionRate + '%';
    }

    // ✅ Only update the records table
    const recordsTableBody = document.querySelector('#records-table tbody');
    recordsTableBody.innerHTML = projectList.map(project => {
        const projectCompletionRate = ((project.uploadedFiles / fixedDocuments.length) * 100).toFixed(0);
        const status = project.uploadedFiles === fixedDocuments.length ? 'Complete' :
                       project.uploadedFiles > 0 ? 'In Progress' : 'Not Started';
        return `
            <tr>
                <td>${project.name}</td>
                <td>${project.year}</td>
                <td>${project.uploadedFiles}/${fixedDocuments.length} (${projectCompletionRate}%)</td>
                <td><span class="status-badge status-${status.toLowerCase().replace(' ', '-')}">${status}</span></td>
                <td>
                     <button class="btn-primary" onclick="showPage('project-details', ${project.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}



// Render Project Details susu
// Render Project Details
function renderProjectDetails(projectId) {
    console.log("Rendering details for project:", projectId);

    const project = projects.find(p => p.id == projectId);
    if (!project) {
        console.error("Project not found:", projectId);
        document.getElementById('project-name').textContent = "Project Not Found";
        return;
    }

    document.getElementById('project-name').textContent = project.name;
    document.getElementById('project-name').setAttribute('data-project-id', projectId);

    // 📌 Progress Bar Calculation
    fetch(`project_manager/fetch_files.php?project_id=${projectId}&t=${Date.now()}`)
    .then(response => response.json())
    .then(data => {
        console.log("Received files:", data.files);
        const uploadedCount = data.files.length; // Get number of uploaded files
        const totalFiles = fixedDocuments.length;
        const completionRate = Math.round((uploadedCount / totalFiles) * 100); // Calculate percentage

        // ✅ Update Progress Bar UI
        document.querySelector('.progress-fill').style.width = `${completionRate}%`;
        document.querySelector('.progress-text').textContent = `${completionRate}% Complete`;

        const documentList = document.querySelector('.document-list');
        documentList.innerHTML = ''; // Clear previous content

        if (!data.success) {
            documentList.innerHTML = '<p>Error loading files.</p>';
            return;
        }

        let uploadedFilesMap = {};
        data.files.forEach(file => {
            uploadedFilesMap[file.document_name] = file;
        });

        fixedDocuments.forEach((docName) => {
            const uploadedFile = uploadedFilesMap[docName] || null;
            const uploaded = uploadedFile !== null && uploadedFile.uploaded == 1;
            const fileName = uploadedFile ? uploadedFile.file_name : "";

            const documentItem = document.createElement('div');
            documentItem.classList.add('document-item');
            documentItem.id = `doc-${docName.replace(/\s+/g, '_')}`;

            documentItem.innerHTML = `
                <span class="document-name">${docName}</span>
                <div class="document-status">
                    ${uploaded ? `
                        <span class="status-icon status-uploaded"><i class="fas fa-check-circle"></i></span>
                        <span style="margin-left: 10px; font-weight: bold;">${fileName}</span> 

                        <button class="btn-primary" style="margin-left: 15px;" onclick="openInM365('${fileName}')">
                            <i class="fas fa-download"></i> View
                        </button>

                        <button class="btn-danger" style="margin-left: 10px;" onclick="deleteFile('${docName}', ${projectId})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    ` : `
                        <input type="file" id="file-input-${docName.replace(/\s+/g, '_')}" 
                               style="display: none;" 
                               onchange="handleFileUpload('${docName}', ${projectId})">
            
                        <button class="btn-primary" style="margin-top: 5px;" 
                                onclick="document.getElementById('file-input-${docName.replace(/\s+/g, '_')}').click()">
                            Upload
                        </button>
                    `}
                </div>
            `;

            documentList.appendChild(documentItem);
        });
    })
    .catch(error => {
        console.error("Error fetching files:", error);
        document.querySelector('.document-list').innerHTML = '<p>Error loading files.</p>';
    });
}


// Function to download file
function downloadFile(fileName) {
    const fileUrl = `project_manager/uploads/${fileName}`;
    window.open(fileUrl, '_blank'); // Opens file in new tab
}


function openInM365(fileName) {
    const fileUrl = encodeURIComponent(`project_manager/uploads/${fileName}`);
    const m365EditorUrl = `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`;

    window.open(m365EditorUrl, '_blank');
}


// Function to confirm and delete file


// Function to delete file
// Function to delete file
function deleteFile(documentName, projectId) {
    Swal.fire({
        title: "Are you sure?",
        text: `This will permanently delete "${documentName}".`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(`🛠 Attempting to delete: ${documentName} (Project ID: ${projectId})`);

            fetch("project_manager/delete_file.php", {
                method: "DELETE",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `projectId=${encodeURIComponent(projectId)}&documentName=${encodeURIComponent(documentName)}`
            })
            .then(response => response.json())
            .then(data => {
                console.log("🖥️ Server Response:", data); // ✅ Debug JSON response

                if (data.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'File deleted successfully!',
                        showConfirmButton: false,
                        timer: 2000 // Auto-close in 2 seconds
                    });

                    // ✅ Restore "Upload" button UI
                    const docRow = document.getElementById(`doc-${documentName.replace(/\s+/g, '_')}`);
                    if (docRow) {
                        docRow.querySelector('.document-status').innerHTML = `
                            <input type="file" id="file-input-${documentName.replace(/\s+/g, '_')}" style="display: none;" onchange="handleFileUpload('${documentName}', ${projectId})">
                            <button class="btn-primary" onclick="document.getElementById('file-input-${documentName.replace(/\s+/g, '_')}').click()">Upload</button>
                        `;
                    }

                    fetchProjects(); // ✅ Update project list
                    renderProjectDetails(projectId); // ✅ Refresh project UI
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Failed!',
                        text: data.error || "Unknown error occurred.",
                    });
                }
            })
            .catch(error => {
                console.error("❌ Delete error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Delete Failed!',
                    text: "An error occurred while deleting the file.",
                });
            });
        }
    });
}




// Handle file upload
function handleFileUpload(documentName, projectId) {
    const fileInput = document.getElementById(`file-input-${documentName.replace(/\s+/g, '_')}`);
    const file = fileInput.files[0];  // Get the selected file

    if (!file) {
        alert("No file selected!");
        return;
    }

    console.log(`📤 Uploading ${file.name} for Project ${projectId} as "${documentName}"`);

    uploadDocument(documentName, projectId, file);
}

// file upload
function uploadDocument(documentName, projectId, file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);
    formData.append("documentName", documentName);

    console.log("📦 FormData contents:");
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
    }

    fetch("project_manager/upload_file.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log("🖥️ Upload Response:", data);

        if (data.success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'File uploaded successfully!',
                showConfirmButton: false,
                timer: 2000 // Auto-close in 2 seconds
            });
            

            // ✅ Update UI on the specific document row
            const docRow = document.getElementById(`doc-${documentName.replace(/\s+/g, '_')}`);
            if (docRow) {
                docRow.querySelector('.document-status').innerHTML = `
                    <span class="status-icon status-uploaded"><i class="fas fa-check-circle"></i></span>
                    <span>Uploaded</span>
                    <button class="btn-primary" onclick="downloadFile('${file.name}')">
                        <i class="fas fa-download"></i> View
                    </button>
                    <button class="btn-danger" onclick="deleteFile('${documentName}', '${projectId}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                `;
            }

            fetchProjects();
            renderProjectDetails(projectId);
        } else {
            alert("Upload failed: " + (data.error || "Unknown error"));
        }
    })
    .catch(error => {
        console.error("❌ Upload error:", error);
        alert("Upload failed. Please try again.");
    });
}

// Update project status

function updateStatus(projectId) {
    const status = document.getElementById(`status-${projectId}`).value;

    fetch('project_manager/update_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, status })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Status updated successfully!");
            fetchProjects();
        } else {
            alert("Failed to update status.");
        }
    })
    .catch(error => alert("Error updating status."));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
});

// Event handlers


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderProjects();
    




    
});

// Logout handler
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.querySelector(".logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async function (event) {
            event.preventDefault(); // Prevent default link behavior

            Swal.fire({
                title: "Are you sure?",
                text: "You will be logged out.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, logout!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        console.log("Sending logout request..."); // Debugging

                        const response = await fetch("project_manager/logout.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                        });

                        const data = await response.json();
                        console.log("Logout Response:", data); // Debugging

                        if (data.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Logging out",
                                text: "Redirecting...",
                                timer: 1500,
                                showConfirmButton: false
                            }).then(() => {
                                window.location.href = "http://localhost/dostphp/index.html"; // ✅ Redirect after logout
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Logout Failed",
                                text: "An error occurred while logging out. Please try again.",
                            });
                        }
                    } catch (error) {
                        console.error("Error:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Logout Error",
                            text: "Something went wrong. Please try again later.",
                        });
                    }
                }
            });
        });
    } else {
        console.log("Logout button not found!"); // Debugging
    }
});