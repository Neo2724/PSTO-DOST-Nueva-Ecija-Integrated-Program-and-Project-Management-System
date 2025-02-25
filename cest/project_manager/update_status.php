<?php

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$projectId = $data['projectId'];
$status = $data['status'];

$stmt = $conn->prepare("UPDATE projects SET status = ? WHERE id = ?");
$stmt->bind_param("si", $status, $projectId);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to update status']);
}
?>
