<?php

require_once __DIR__ . "/../core/Database.php";

class Budget {

    private $conn;
    private $table = "budgets";

    public function __construct() {
        // Connect to database
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Create new budget
    public function create($name, $type, $period, $limit_amount, $start_date, $end_date, $user_id) {

        $sql = "INSERT INTO " . $this->table . " 
                (name, type, period, limit_amount, start_date, end_date, user_id)
                VALUES 
                (:name, :type, :period, :limit_amount, :start_date, :end_date, :user_id)";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":name" => $name,
            ":type" => $type,
            ":period" => $period,
            ":limit_amount" => $limit_amount,
            ":start_date" => $start_date,
            ":end_date" => $end_date,
            ":user_id" => $user_id
        ]);
    }

    // Get all budgets for one user
    public function getByUser($user_id) {

        $sql = "SELECT * FROM " . $this->table . "
                WHERE user_id = :user_id
                ORDER BY id DESC";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute([
            ":user_id" => $user_id
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


        // Update budget
    public function update($id, $name, $type, $period, $limit_amount, $start_date, $end_date) {

        $sql = "UPDATE " . $this->table . "
                SET name = :name,
                    type = :type,
                    period = :period,
                    limit_amount = :limit_amount,
                    start_date = :start_date,
                    end_date = :end_date
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":id" => $id,
            ":name" => $name,
            ":type" => $type,
            ":period" => $period,
            ":limit_amount" => $limit_amount,
            ":start_date" => $start_date,
            ":end_date" => $end_date
        ]);
    }

    // Delete budget
    public function delete($id) {

        $sql = "DELETE FROM " . $this->table . " WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":id" => $id
        ]);
    }

}