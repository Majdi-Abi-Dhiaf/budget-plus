<?php

require_once __DIR__ . "/../models/Budget.php";

class BudgetController {

    // Add budget
    public function create() {

        // Get JSON data from request body
        $data = json_decode(file_get_contents("php://input"), true);

        // Check required fields
        if (!isset(
            $data["name"],
            $data["type"],
            $data["period"],
            $data["limit_amount"],
            $data["user_id"]
        )) {
            echo json_encode([
                "message" => "Required fields missing"
            ]);
            return;
        }

        // Optional dates
        $start_date = $data["start_date"] ?? null;
        $end_date = $data["end_date"] ?? null;

        // Create Budget model
        $budget = new Budget();

        // Insert budget in database
        if ($budget->create(
            $data["name"],
            $data["type"],
            $data["period"],
            $data["limit_amount"],
            $start_date,
            $end_date,
            $data["user_id"]
        )) {
            echo json_encode([
                "message" => "Budget created successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "Failed to create budget"
            ]);
        }
    }

    // Get budgets
    public function getAll() {

        // Get user_id from URL
        $user_id = $_GET["user_id"] ?? null;

        if (!$user_id) {
            echo json_encode([
                "message" => "user_id is required"
            ]);
            return;
        }

        // Create Budget model
        $budget = new Budget();

        // Return budgets as JSON
        echo json_encode([
            "budgets" => $budget->getByUser($user_id)
        ]);
    }


        // Update budget
    public function update() {

        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset(
            $data["id"],
            $data["name"],
            $data["type"],
            $data["period"],
            $data["limit_amount"]
        )) {
            echo json_encode([
                "message" => "Required fields missing"
            ]);
            return;
        }

        $start_date = $data["start_date"] ?? null;
        $end_date = $data["end_date"] ?? null;

        $budget = new Budget();

        if ($budget->update(
            $data["id"],
            $data["name"],
            $data["type"],
            $data["period"],
            $data["limit_amount"],
            $start_date,
            $end_date
        )) {
            echo json_encode([
                "message" => "Budget updated successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "Failed to update budget"
            ]);
        }
    }

    // Delete budget
    public function delete() {

        $id = $_GET["id"] ?? null;

        if (!$id) {
            echo json_encode([
                "message" => "Budget id is required"
            ]);
            return;
        }

        $budget = new Budget();

        if ($budget->delete($id)) {
            echo json_encode([
                "message" => "Budget deleted successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "Failed to delete budget"
            ]);
        }
    }
}