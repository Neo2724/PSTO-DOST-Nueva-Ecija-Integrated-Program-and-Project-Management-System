<?php
session_start();
require 'db.php'; // Ensure this connects to your database

header('Content-Type: application/json');

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data || !isset($data['username']) || !isset($data['password']) || !isset($data['program'])) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

$username = trim($data['username']);
$password = password_hash(trim($data['password']), PASSWORD_DEFAULT); // Secure hash
$program = strtolower(trim($data['program'])); // Convert to lowercase

// Choose the correct table based on program
$validPrograms = ['cest', 'gia', 'setup'];
if (!in_array($program, $validPrograms)) {
    echo json_encode(["success" => false, "message" => "Invalid program selected."]);
    exit;
}

$table = $program . "_users"; // Dynamically set table name

// Check if username already exists
$stmt = $conn->prepare("SELECT id FROM $table WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Username already taken."]);
    exit;
}
$stmt->close();

// Insert new user
$stmt = $conn->prepare("INSERT INTO $table (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Account created successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error creating account."]);
}

$stmt->close();
$conn->close();
?>
