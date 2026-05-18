<?php

require_once __DIR__ . "/../models/Category.php";

class CategoryController {

    // Add category
    public function create() {

        // Get JSON body from request
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate required fields
        if (!isset($data["name"], $data["type"], $data["user_id"])) {
            echo json_encode([
                "message" => "Name, type and user_id are required"
            ]);
            return;
        }

        // Create Category model
        $category = new Category();

        // Insert category in database
        if ($category->create($data["name"], $data["type"], $data["user_id"])) {
            echo json_encode([
                "message" => "Category created successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "Failed to create category"
            ]);
        }
    }

    // Get categories
    public function getAll() {

        // Get user_id from URL
        $user_id = $_GET["user_id"] ?? null;

        if (!$user_id) {
            echo json_encode([
                "message" => "user_id is required"
            ]);
            return;
        }

        // Create Category model
        $category = new Category();

        // Return categories as JSON
        echo json_encode([
            "categories" => $category->getByUser($user_id)
        ]);
    }

    // Update category
    public function update() {

        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["id"], $data["name"], $data["type"])) {
            echo json_encode(["message" => "Required fields missing"]);
            return;
        }

        $category = new Category();

        if ($category->update($data["id"], $data["name"], $data["type"])) {
            echo json_encode(["message" => "Category updated successfully"]);
        } else {
            echo json_encode(["message" => "Failed to update category"]);
        }
    }

    // Delete category
    public function delete() {

        $id = $_GET["id"] ?? null;

        if (!$id) {
            echo json_encode(["message" => "Category id is required"]);
            return;
        }

        $category = new Category();

        if ($category->delete($id)) {
            echo json_encode(["message" => "Category deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete category"]);
        }
    }

}