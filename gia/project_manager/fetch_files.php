<?php
require 'db.php';

$projectId = $_GET['project_id'] ?? null;
$response = ['success' => false, 'files' => []]; // ✅ Ensure the key is "files"

if ($projectId) {
    $query = "SELECT id, document_name, file_name, uploaded FROM gia_files WHERE project_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $projectId);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $response['files'][] = [  // ✅ Correcting the key from "gia_files" to "files"
            'id' => $row['id'],
            'document_name' => $row['document_name'],
            'file_name' => $row['file_name'],
            'uploaded' => (bool) $row['uploaded']
        ];
    }

    $response['success'] = true;
}

echo json_encode($response);
?>
