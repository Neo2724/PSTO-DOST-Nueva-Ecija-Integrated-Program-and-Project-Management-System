<?php

require 'db.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json'); // ✅ Ensure JSON response


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $year = $_POST['year'];
    $status = "For Deployment"; // Default status

    $stmt = $conn->prepare("INSERT INTO gia_projects (name, year, status) VALUES (?, ?, ?)");
    $defaultStatus = 'For Deployment';
    $stmt->bind_param("sis", $projectName, $projectYear, $defaultStatus);
    

    $stmt->bind_param("sis", $name, $year, $status);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Database insert error']);
    }
}
?>
