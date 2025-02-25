
<?php
session_start();
if (!isset($_SESSION['user']) || $_SESSION['system'] !== 'cest') {
    header("Location: /DostPHP/index.html"); // Redirect to main page if not logged in or wrong system
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CEST System - DOST Nueva Ecija</title>
    
    <link rel="stylesheet" href="system-styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    
    
</head>

<body onload="fetchProjects()">
    <div class="system-container">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-header">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CEST-yKB8MK7XxhefbauyLAPUydqYeZ5IL9.png" alt="CEST Logo" class="system-logo">
                <h2>CEST System</h2>
            </div>
            <nav>
                <a href="#" class="nav-item active" onclick="showPage('dashboard')"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                <a href="#" class="nav-item" onclick="showPage('projects')"><i class="fas fa-project-diagram"></i> Projects</a>
                <a href="#" class="nav-item" onclick="showPage('files')"><i class="fas fa-file-alt"></i> Files</a>
                <!---------<a href="#" class="nav-item" onclick="showPage('project-details')"><i class="fas fa-tasks"></i> Project Details</a>-->
                
            </nav>
            <div class="sidebar-footer">
    <a href="#" class="nav-item logoutBtn">
        <i class="fas fa-sign-out-alt"></i> Logout
    </a>
</div>

        </div>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Dashboard Page -->
            <div id="dashboard-page" class="content-page">
                <div class="page-header">
                    <h1>Dashboard</h1>
                </div>
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <h3>Total Projects</h3>
                        <p id="total-projects">0</p>
                    </div>
                    <div class="stat-card">
                        <h3>Total Files</h3>
                        <p id="total-files">0</p>
                    </div>
          
                    <div class="stat-card">
                        <h3>Completion Rate</h3>
                        <p id="completion-rate">0%</p>
                    </div>
                </div>

              <!-- Dashboard Search & Filter -->

              <div class="filter-container">
                <input type="text" id="dashboard-search-input" placeholder="Search projects..." onkeyup="filterProjects()">
<select id="dashboard-year-filter" onchange="filterProjects()">
    <option value="">All Years</option>
</select>
              </div>






                <div class="records-list">
                    <h2>Recent Records</h2>
                    <table id="records-table">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Year</th>
                                <th>Files</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Records will be dynamically added here -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Projects Page -->
            <div id="projects-page" class="content-page" style="display: none;">
                <div class="page-header">
                    <h1>Projects</h1>
                    <button onclick="showModal('newProjectModal')" class="btn-primary">

                     

                        <i class="fas fa-plus"></i> New Project
                    </button>
                </div>
            
           <div class="filter-container">
             <input type="text" id="projects-search-input" placeholder="Search projects..." onkeyup="filterProjectsPage()">
                <select id="projects-year-filter" onchange="filterProjectsPage()">
                    <option value="">All Years</option>
                </select>
                 
                    </div>
                

                <div class="projects-grid">

                    <!-- Project folders will be dynamically added here -->
                </div>
            </div>

            <!-- Files Page -->
            <div id="files-page" class="content-page" style="display: none;">
                <div class="page-header">
                    <h1>Files</h1>
                    <div class="search-bar">
                        <input type="text" placeholder="Search files...">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
            
                <div class="files-list">
                    <!-- Files will be dynamically added here -->
                </div>
            </div>
            
            <!---------- project Details ------------->

    <div id="project-details-page" class="content-page" style="display: none;">
        <div class="page-header">
            <a href="#" onclick="showPage('dashboard')" class="btn-primary">back </a>
            
            <h1 id="project-name"></h1>
          
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <span class="progress-text"></span>
            </div>
        </div>
        
        <div class="document-list">
            <!-- Hardcoded 19 required documents -->
           
            </div>
            
        
        
    </div>

    <!-- New Project Modal -->


    <div id="newProjectModal" class="modal"> 
        <div class="modal-content">
            <span class="close" onclick="document.getElementById('newProjectModal').style.display = 'none'">&times;</span>
            <h2>Create New Project</h2>
            <form id="newProjectForm" onsubmit="event.preventDefault(); createProject();">
                <div class="form-group">
                    <label for="project-name-input">Project Name</label>
                    <input type="text" id="project-name-input" required>
                </div>
                <div class="form-group">
                    <label for="project-year-input">Year</label>
                    <select id="project-year-input" required>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div class="form-group">
                  
                </div>
                <button type="submit" class="btn-primary">Save Project</button>
            </form>
        </div>
    </div>
    


    
                <!-- Document items will be dynamically added here -->
            </div>
        </div>
    </div>
</div>
</div>
<script>//files forms template

    function fetchFiles() {
        fetch('http://localhost/dostphp/cest/list_files.php') // Ensure the PHP script is in the correct directory
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
    document.addEventListener("DOMContentLoaded", fetchFiles);</script>

    <script src="system-script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</body>
</html>
