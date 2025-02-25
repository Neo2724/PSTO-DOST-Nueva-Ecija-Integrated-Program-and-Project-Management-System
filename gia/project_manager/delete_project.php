<?php

require 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $projectId = $_POST['projectId'] ?? null;

    if (!$projectId) {
        echo json_encode(['success' => false, 'error' => 'Missing project ID']);
        exit;
    }

    // ✅ Fetch all files associated with the project
    $stmt = $conn->prepare("SELECT file_name FROM gia_files WHERE project_id = ?");
    $stmt->bind_param("i", $projectId);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $filePath = "uploads/" . $row['file_name'];

        // ✅ Delete file from server if it exists
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    // ✅ Delete all associated file records from the `files` table
    $stmt = $conn->prepare("DELETE FROM gia_files WHERE project_id = ?");
    $stmt->bind_param("i", $projectId);
    $stmt->execute();

    // ✅ Delete the project itself
    $stmt = $conn->prepare("DELETE FROM gia_projects WHERE id = ?");
    $stmt->bind_param("i", $projectId);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to delete project']);
    }
}
?>
