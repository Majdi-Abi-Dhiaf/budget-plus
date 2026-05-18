<?php

require_once __DIR__ . "/../core/Database.php";

class UserSession {

    private $conn;
    private $table = "user_sessions";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Save token in database
    public function create($user_id, $token, $expires_at) {

        $sql = "INSERT INTO " . $this->table . "
                (user_id, token, expires_at)
                VALUES (:user_id, :token, :expires_at)";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":user_id" => $user_id,
            ":token" => $token,
            ":expires_at" => $expires_at
        ]);
    }

    // Check if token exists
    public function findToken($token) {

        $sql = "SELECT * FROM " . $this->table . "
                WHERE token = :token
                AND expires_at > NOW()
                LIMIT 1";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute([
            ":token" => $token
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Delete session token
    public function deleteToken($token) {

        $sql = "DELETE FROM " . $this->table . "
                WHERE token = :token";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":token" => $token
        ]);
    }
}