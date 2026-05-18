<?php

require_once __DIR__ . "/../core/Database.php";

class Transaction {

    private $conn;
    private $table = "transactions";

    public function __construct() {
        // Connect to database
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Create new transaction
    public function create($type, $amount, $description, $date_transaction, $user_id, $category_id, $budget_id) {

        $sql = "INSERT INTO " . $this->table . "
                (type, amount, description, date_transaction, user_id, category_id, budget_id)
                VALUES
                (:type, :amount, :description, :date_transaction, :user_id, :category_id, :budget_id)";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":type" => $type,
            ":amount" => $amount,
            ":description" => $description,
            ":date_transaction" => $date_transaction,
            ":user_id" => $user_id,
            ":category_id" => $category_id,
            ":budget_id" => $budget_id
        ]);
    }

    // Get all transactions for one user
    public function getByUser($user_id) {

        $sql = "SELECT 
                    transactions.*,
                    categories.name AS category_name,
                    budgets.name AS budget_name
                FROM " . $this->table . "
                LEFT JOIN categories ON transactions.category_id = categories.id
                LEFT JOIN budgets ON transactions.budget_id = budgets.id
                WHERE transactions.user_id = :user_id
                ORDER BY transactions.id DESC";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute([
            ":user_id" => $user_id
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


        // Update transaction
    public function update($id, $type, $amount, $description, $date_transaction, $category_id, $budget_id) {

        $sql = "UPDATE " . $this->table . "
                SET type = :type,
                    amount = :amount,
                    description = :description,
                    date_transaction = :date_transaction,
                    category_id = :category_id,
                    budget_id = :budget_id
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":id" => $id,
            ":type" => $type,
            ":amount" => $amount,
            ":description" => $description,
            ":date_transaction" => $date_transaction,
            ":category_id" => $category_id,
            ":budget_id" => $budget_id
        ]);
    }

    // Delete transaction
    public function delete($id) {

        $sql = "DELETE FROM " . $this->table . " WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":id" => $id
        ]);
    }
}   