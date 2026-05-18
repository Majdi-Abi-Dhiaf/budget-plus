<?php

require_once __DIR__ . "/../core/Database.php";

class Alert {

    private $conn;
    private $table = "alerts";

    public function __construct() {
        // Connect to database
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Create alert
    public function create($user_id, $budget_id, $message) {
        $sql = "INSERT INTO " . $this->table . " 
                (user_id, budget_id, message)
                VALUES (:user_id, :budget_id, :message)";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":user_id" => $user_id,
            ":budget_id" => $budget_id,
            ":message" => $message
        ]);
    }

    // Get alerts by user
    public function getByUser($user_id) {
        $sql = "SELECT * FROM " . $this->table . "
                WHERE user_id = :user_id
                ORDER BY id DESC";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([":user_id" => $user_id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}