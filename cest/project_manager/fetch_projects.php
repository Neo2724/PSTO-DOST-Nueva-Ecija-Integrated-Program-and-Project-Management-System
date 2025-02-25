<?php

require 'db.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

$query = "SELECT id, name, year, status FROM projects"; // ✅ Ensure status is selected
$result = $conn->query($query);

if (!$result) {
    echo json_encode(['success' => false, 'error' => $conn->error]);
    exit;
}

$projects = [];
$totalRequiredFiles = 21; // Update this number if required files change

while ($row = $result->fetch_assoc()) {
    $projectId = $row['id'];

    // ✅ Count only valid uploaded files
    $fileQuery = "SELECT COUNT(*) AS uploadedCount FROM files WHERE project_id = ? AND uploaded = 1";
    $stmt = $conn->prepare($fileQuery);
    $stmt->bind_param("i", $projectId);
    $stmt->execute();
    $fileResult = $stmt->get_result();
    $uploadedCount = $fileResult->fetch_assoc()['uploadedCount'] ?? 0;

    // ✅ Automatically mark project as "Complete" if all required files are uploaded
    $status = ($uploadedCount >= $totalRequiredFiles) ? 'Complete' : $row['status'];

    $projects[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'year' => $row['year'],
        'status' => $status, // ✅ Now automatically updates if all files are uploaded
        'uploadedFiles' => $uploadedCount
    ];
}

echo json_encode($projects);
?>
