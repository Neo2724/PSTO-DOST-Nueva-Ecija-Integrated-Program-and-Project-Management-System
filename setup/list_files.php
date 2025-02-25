<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Correct directory path
$dir = __DIR__ . '/Forms'; // Path to your forms directory

// Check if the directory exists
if (!is_dir($dir)) {
    echo json_encode(['error' => 'Directory not found: ' . $dir]);
    exit; // Stop execution if directory does not exist
}

// Get all files in the directory
$files = array_diff(scandir($dir), array('.', '..'));

$fileList = [];
foreach ($files as $file) {
    $filePath = $dir . '/' . $file;

    // Check if it's a file before processing
    if (is_file($filePath)) {
        $fileSize = filesize($filePath);
        $fileDate = date("Y-m-d H:i:s", filemtime($filePath)); // Get the last modified date

        // Get file extension and type (Optional, for display purposes)
        $fileExtension = pathinfo($file, PATHINFO_EXTENSION);
        $fileType = strtoupper($fileExtension); // Convert to uppercase (PDF, DOCX, etc.)

        $fileList[] = [
            'name' => $file,
            'type' => $fileType,
            'size' => number_format($fileSize / 1024 / 1024, 2) . ' MB', // Convert bytes to MB
            'date' => $fileDate
        ];
    }
}

// Return the list as JSON
echo json_encode($fileList);
?>
