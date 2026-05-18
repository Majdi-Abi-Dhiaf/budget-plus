<?php

require_once __DIR__ . "/../core/Database.php";

class User {
    private $conn;
    private $table = "users";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function create($name, $email, $password) {
        $sql = "INSERT INTO " . $this->table . " (name, email, password)
                VALUES (:name, :email, :password)";

        $stmt = $this->conn->prepare($sql);

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        return $stmt->execute([
            ":name" => $name,
            ":email" => $email,
            ":password" => $hashedPassword
        ]);
    } 

        // Find user by email
    public function findByEmail($email) {

        // SQL query
        $sql = "SELECT * FROM " . $this->table . " WHERE email = :email LIMIT 1";

        // Prepare query
        $stmt = $this->conn->prepare($sql);

        // Execute query
        $stmt->execute([
            ":email" => $email
        ]);

        // Return user data
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } 



        // Get all users
    public function getAll() {
        $sql = "SELECT id, name, email, role, status, created_at 
                FROM " . $this->table . "
                ORDER BY id DESC";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Update user status
    public function updateStatus($id, $status) {
        $sql = "UPDATE " . $this->table . "
                SET status = :status
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":id" => $id,
            ":status" => $status
        ]);
    }

    // Update user role
    public function updateRole($id, $role) {
        $sql = "UPDATE " . $this->table . "
                SET role = :role
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":id" => $id,
            ":role" => $role
        ]);
    }
}