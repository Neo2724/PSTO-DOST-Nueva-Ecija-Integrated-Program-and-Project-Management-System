<?php
session_start();
if (!isset($_SESSION['user']) || $_SESSION['system'] !== 'setup') {
    header("Location: /DostPHP/index.html"); // Redirect to main page if not logged in or wrong system
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SETUP System - DOST Nueva Ecija</title>
    <link rel="stylesheet" href="system-styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="system-container">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-header">
                <img src= "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SETUP_4.0-xvNFWy4q6P2UtuitnWvoWcY5WNFrff.png" alt="CEST Logo" class="system-logo">
                <h2>SETUP System </h2>
            </div>
            <nav>
                <a href="#" class="nav-item active" onclick="showPage('dashboard')"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                <a href="#" class="nav-item" onclick="showPage('projects')"><i class="fas fa-project-diagram"></i> Projects</a>
                <a href="#" class="nav-item" onclick="showPage('files')"><i class="fas fa-file-alt"></i> Files</a>
                
            </nav>
            <div class="sidebar-footer">
                <a href="/dostphp/index.html" class="nav-item logout">
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
                    <button onclick="showNewProjectModal()" class="btn-primary">
                        <i class="fas fa-plus"></i> New Project
                    </button>
                </div>

                <div class="projects-grid">
                    <!-- Project folders will be dynamically added here -->
                </div>
            </div>

            <!-- Files Page -->
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

    <!-- New Project Modal -->
    <div id="newProjectModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Create New Project</h2>
            <form id="newProjectForm">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Year</label>
                    <select required>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Required Files</label>
                    <input type="number" min="1" required>
                </div>
                <button type="submit" class="btn-primary">Create Project</button>
            </form>
        </div>
    </div>

    <!-- Upload Files Modal -->
    <div id="uploadModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Upload Files</h2>
            <form id="uploadForm">
                <div class="upload-area">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Drag & Drop files here or click to browse</p>
                    <input type="file" multiple hidden>
                </div>
                <div class="file-list">
                    <!-- Uploaded files will appear here -->
                </div>
                <button type="submit" class="btn-primary">Upload Files</button>
            </form>
        </div>
    </div>

    <script src="system-script.js"></script>
</body>
</html>