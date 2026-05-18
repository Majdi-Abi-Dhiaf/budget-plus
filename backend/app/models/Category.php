<?php

require_once __DIR__ . "/../core/Database.php";

class Category {

    private $conn;
    private $table = "categories";

    public function __construct() {
        // Connect to database
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Create new category
    public function create($name, $type, $user_id) {

        $sql = "INSERT INTO " . $this->table . " (name, type, user_id)
                VALUES (:name, :type, :user_id)";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":name" => $name,
            ":type" => $type,
            ":user_id" => $user_id
        ]);
    }

    // Get all categories for one user
    public function getByUser($user_id) {

        $sql = "SELECT * FROM " . $this->table . "
                WHERE user_id = :user_id OR user_id IS NULL
                ORDER BY id DESC";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute([
            ":user_id" => $user_id
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


        // Update category
    public function update($id, $name, $type) {

        $sql = "UPDATE " . $this->table . "
                SET name = :name,
                    type = :type
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":id" => $id,
            ":name" => $name,
            ":type" => $type
        ]);
    }

    // Delete category
    public function delete($id) {

        $sql = "DELETE FROM " . $this->table . "
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":id" => $id
        ]);
    }
}