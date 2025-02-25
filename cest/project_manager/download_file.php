<?php

$file = $_GET['file'];
$filePath = "uploads/" . basename($file);

if (file_exists($filePath)) {
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
    readfile($filePath);
    exit;
} else {
    echo "File not found.";
}
?>
