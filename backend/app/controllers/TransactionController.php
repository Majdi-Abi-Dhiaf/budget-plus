<?php

require_once __DIR__ . "/../models/Transaction.php";
require_once __DIR__ . "/../models/Alert.php";
require_once __DIR__ . "/../core/Database.php";

class TransactionController {

    // Add transaction
    public function create() {

        // Get JSON data from request body
        $data = json_decode(file_get_contents("php://input"), true);

        // Check required fields
        if (!isset(
            $data["type"],
            $data["amount"],
            $data["date_transaction"],
            $data["user_id"]
        )) {
            echo json_encode([
                "message" => "Required fields missing"
            ]);
            return;
        }

        // Optional fields
        $description = $data["description"] ?? null;
        $category_id = $data["category_id"] ?? null;
        $budget_id = $data["budget_id"] ?? null;

        // Create Transaction model
        $transaction = new Transaction();

        // Insert transaction in database
        if ($transaction->create(
            $data["type"],
            $data["amount"],
            $description,
            $data["date_transaction"],
            $data["user_id"],
            $category_id,
            $budget_id
        )) {

            // Default alert value
            $alertMessage = null;

            // Check alert only if transaction is expense and has budget
            if ($data["type"] === "expense" && $budget_id !== null) {

                // Connect to database
                $database = new Database();
                $conn = $database->connect();

                // Calculate total expenses for this budget
                $sql = "SELECT SUM(amount) AS total_expense 
                        FROM transactions 
                        WHERE budget_id = :budget_id 
                        AND type = 'expense'";

                $stmt = $conn->prepare($sql);
                $stmt->execute([
                    ":budget_id" => $budget_id
                ]);

                $expense = $stmt->fetch(PDO::FETCH_ASSOC);

                // Get budget limit
                $sqlBudget = "SELECT limit_amount 
                              FROM budgets 
                              WHERE id = :budget_id";

                $stmtBudget = $conn->prepare($sqlBudget);
                $stmtBudget->execute([
                    ":budget_id" => $budget_id
                ]);

                $budget = $stmtBudget->fetch(PDO::FETCH_ASSOC);

                $totalExpense = $expense["total_expense"] ?? 0;
                $limitAmount = $budget["limit_amount"] ?? 0;

                // Create alert if budget is exceeded
                if ($limitAmount > 0 && $totalExpense > $limitAmount) {

                    $alertMessage = "Attention : le budget est dépassé.";

                    $alert = new Alert();

                    $alert->create(
                        $data["user_id"],
                        $budget_id,
                        $alertMessage
                    );
                }
            }

            // Success response
            echo json_encode([
                "message" => "Transaction created successfully",
                "alert" => $alertMessage
            ]);

        } else {
            echo json_encode([
                "message" => "Failed to create transaction"
            ]);
        }
    }

    // Get transactions
    public function getAll() {

        // Get user_id from URL
        $user_id = $_GET["user_id"] ?? null;

        if (!$user_id) {
            echo json_encode([
                "message" => "user_id is required"
            ]);
            return;
        }

        // Create Transaction model
        $transaction = new Transaction();

        // Return transactions as JSON
        echo json_encode([
            "transactions" => $transaction->getByUser($user_id)
        ]);
    }

    // Update transaction
    public function update() {

        // Get JSON data
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate required fields
        if (!isset(
            $data["id"],
            $data["type"],
            $data["amount"],
            $data["date_transaction"]
        )) {
            echo json_encode([
                "message" => "Required fields missing"
            ]);
            return;
        }

        // Optional fields
        $description = $data["description"] ?? null;
        $category_id = $data["category_id"] ?? null;
        $budget_id = $data["budget_id"] ?? null;

        // Create model
        $transaction = new Transaction();

        // Update transaction
        if ($transaction->update(
            $data["id"],
            $data["type"],
            $data["amount"],
            $description,
            $data["date_transaction"],
            $category_id,
            $budget_id
        )) {
            echo json_encode([
                "message" => "Transaction updated successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "Failed to update transaction"
            ]);
        }
    }

    // Delete transaction
    public function delete() {

        // Get transaction id from URL
        $id = $_GET["id"] ?? null;

        if (!$id) {
            echo json_encode([
                "message" => "Transaction id is required"
            ]);
            return;
        }

        // Create model
        $transaction = new Transaction();

        // Delete transaction
        if ($transaction->delete($id)) {
            echo json_encode([
                "message" => "Transaction deleted successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "Failed to delete transaction"
            ]);
        }
    }
}