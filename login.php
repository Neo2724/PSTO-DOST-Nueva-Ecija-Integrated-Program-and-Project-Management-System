<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data || !isset($data['username']) || !isset($data['password']) || !isset($data['system'])) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$username = trim($data['username']);
$password = trim($data['password']);
$system = trim($data['system']);

$validSystems = ["cest", "gia", "setup"];
if (!in_array($system, $validSystems)) {
    echo json_encode(["success" => false, "message" => "Invalid system"]);
    exit;
}

// Determine correct database table
$table = "{$system}_users"; // Example: cest_users, gia_users, setup_users

$stmt = $conn->prepare("SELECT * FROM $table WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) { 
    $_SESSION['user'] = $username;
    $_SESSION['system'] = $system;
    echo json_encode(["success" => true, "message" => "Login successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Incorrect username or password"]);
}


$stmt->close();
$conn->close();
?>
