<?php

require_once __DIR__ . "/../models/User.php";

class UserController {

    // Get all users for admin
    public function getAll() {
        $user = new User();

        echo json_encode([
            "users" => $user->getAll()
        ]);
    }

    // Activate, pending, or delete user account
    public function updateStatus() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["id"], $data["status"])) {
            echo json_encode([
                "message" => "User id and status are required"
            ]);
            return;
        }

        $user = new User();

        if ($user->updateStatus($data["id"], $data["status"])) {
            echo json_encode([
                "message" => "User status updated successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "Failed to update user status"
            ]);
        }
    }

    // Change user role
    public function updateRole() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["id"], $data["role"])) {
            echo json_encode([
                "message" => "User id and role are required"
            ]);
            return;
        }

        $user = new User();

        if ($user->updateRole($data["id"], $data["role"])) {
            echo json_encode([
                "message" => "User role updated successfully"
            ]);
        } else {
            echo json_encode([
                "message" => "Failed to update user role"
            ]);
        }
    }
}