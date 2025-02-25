<?php

require 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("🔍 Received upload request");

    $projectId = $_POST['projectId'] ?? null;
    $documentName = $_POST['documentName'] ?? null;
    $file = $_FILES['file'] ?? null;

    // Debugging logs
    error_log("📌 Project ID: " . json_encode($projectId));
    error_log("📌 Document Name: " . json_encode($documentName));
    error_log("📌 File Data: " . json_encode($file));

    if (!$projectId || !$documentName || !$file) {
        echo json_encode(['success' => false, 'error' => 'Missing project ID, document name, or file']);
        exit;
    }

    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'error' => 'File upload error: ' . $file['error']]);
        exit;
    }

    // ✅ Reject empty files (0 bytes)
    if ($file['size'] == 0) {
        echo json_encode(['success' => false, 'error' => 'Empty file detected. Please upload a valid file.']);
        exit;
    }

    $uploadDir = 'uploads/';
    $fileName = time() . "_" . basename($file['name']);  // Unique filename
    $targetPath = $uploadDir . $fileName;

    // ✅ Check if the file already exists for the same document
    $checkStmt = $conn->prepare("SELECT id FROM gia_files WHERE project_id = ? AND document_name = ?");
    $checkStmt->bind_param("is", $projectId, $documentName);
    $checkStmt->execute();
    $existingFile = $checkStmt->get_result()->fetch_assoc();

    if ($existingFile) {
        echo json_encode(['success' => false, 'error' => 'File for this document already exists.']);
        exit;
    }

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        error_log("✅ File moved to: " . $targetPath);

        // ✅ Insert into database
        $stmt = $conn->prepare("INSERT INTO gia_files (project_id, document_name, file_name, uploaded) VALUES (?, ?, ?, 1)");
        $stmt->bind_param("iss", $projectId, $documentName, $fileName);

        if ($stmt->execute()) {
            error_log("✅ File successfully saved to database");
            echo json_encode(['success' => true, 'file_name' => $fileName]);
        } else {
            error_log("❌ Database insert error: " . $stmt->error);
            echo json_encode(['success' => false, 'error' => 'Database insert error']);
        }
    } else {
        error_log("❌ Failed to move uploaded file");
        echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file']);
    }
}
?>
