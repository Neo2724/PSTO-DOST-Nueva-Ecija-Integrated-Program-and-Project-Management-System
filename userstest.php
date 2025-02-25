<?php
require 'db.php';

$password = password_hash('password123', PASSWORD_DEFAULT); // Hashing password securely

$users = [
    ["cest_users", "cest_admin", "CEST Admin"],
    ["gia_users", "gia_admin", "GIA Admin"],
    ["setup_users", "setup_admin", "SETUP Admin"]
];

foreach ($users as $user) {
    $table = $user[0];
    $username = $user[1];
    $full_name = $user[2];

    $sql = "INSERT INTO $table (username, password, full_name, role) VALUES (?, ?, ?, 'admin')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $password, $full_name);
    $stmt->execute();
}

echo "Users inserted successfully!";
?>
