<?php

require 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $projectId = $_POST['projectId'] ?? null;
    $newProjectName = $_POST['newProjectName'] ?? null;
    $newProjectYear = $_POST['newProjectYear'] ?? null;

    if (!$projectId || !$newProjectName || !$newProjectYear) {
        echo json_encode(['success' => false, 'error' => 'Missing parameters']);
        exit;
    }

    // ✅ Update both name and year in the database
    $stmt = $conn->prepare("UPDATE projects SET name = ?, year = ? WHERE id = ?");
    $stmt->bind_param("ssi", $newProjectName, $newProjectYear, $projectId);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Database update failed']);
    }
}
?>
