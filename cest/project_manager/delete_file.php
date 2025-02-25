<?php

require 'db.php';

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $projectId = $_DELETE['projectId'] ?? null;
    $documentName = $_DELETE['documentName'] ?? null;

    error_log("🛠 DELETE Request Received");
    error_log("🔹 Project ID: " . json_encode($projectId));
    error_log("🔹 Document Name: " . json_encode($documentName));

    if (!$projectId || !$documentName) {
        error_log("❌ Missing parameters");
        echo json_encode(['success' => false, 'error' => 'Missing parameters']);
        exit;
    }

    // Fetch file name
    $stmt = $conn->prepare("SELECT file_name FROM files WHERE project_id = ? AND LOWER(document_name) = LOWER(?)");
    $stmt->bind_param("is", $projectId, $documentName);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $filePath = "uploads/" . $row['file_name'];

        error_log("📂 File to delete: " . $filePath);

        // Delete file from server
        if (file_exists($filePath)) {
            unlink($filePath);
            error_log("✅ File deleted from server");
        } else {
            error_log("⚠️ File not found on server");
        }

        // Remove from database
        $deleteStmt = $conn->prepare("DELETE FROM files WHERE project_id = ? AND document_name = ?");
        $deleteStmt->bind_param("is", $projectId, $documentName);
        if ($deleteStmt->execute()) {
            error_log("✅ File record deleted from database");
            echo json_encode(['success' => true]);
        } else {
            error_log("❌ Failed to delete from database: " . $deleteStmt->error);
            echo json_encode(['success' => false, 'error' => 'Failed to delete file from database']);
        }
    } else {
        error_log("❌ File not found in database");
        echo json_encode(['success' => false, 'error' => 'File not found in database']);
    }
}
?>
