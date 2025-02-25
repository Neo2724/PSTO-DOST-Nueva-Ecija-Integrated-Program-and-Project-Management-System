<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
    exit;
}

// Log everything for debugging
$log = "DEBUG LOG:\n";
$log .= "Request Method: " . $_SERVER['REQUEST_METHOD'] . "\n";
$log .= "FILES: " . print_r($_FILES, true) . "\n";
$log .= "POST: " . print_r($_POST, true) . "\n";

// Save debug log
file_put_contents("upload_debug.log", $log);

if (!isset($_FILES['file'])) {
    echo json_encode(["success" => false, "error" => "No file received"]);
    exit;
}

$file = $_FILES['file'];

echo json_encode([
    "success" => true,
    "message" => "File received successfully",
    "file_name" => $file['name'],
    "file_size" => $file['size'],
    "temp_location" => $file['tmp_name']
]);
?>
