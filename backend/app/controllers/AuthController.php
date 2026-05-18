<?php

require_once __DIR__ . "/../models/User.php";
require_once __DIR__ . "/../core/JwtHelper.php";
require_once __DIR__ . "/../models/UserSession.php";

class AuthController {

    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["name"], $data["email"], $data["password"])) {
            echo json_encode(["message" => "All fields are required"]);
            return;
        }

        $user = new User();

        if ($user->create($data["name"], $data["email"], $data["password"])) {
            echo json_encode(["message" => "User registered successfully"]);
        } else {
            echo json_encode(["message" => "Registration failed"]);
        }
    }


        // User login
    public function login() {

        // Get JSON data from request
        $data = json_decode(file_get_contents("php://input"), true);

        // Check if email and password exist
        if (!isset($data["email"], $data["password"])) {

            echo json_encode([
                "message" => "Email and password required"
            ]);

            return;
        }

        // Create User model
        $user = new User();

        // Search user by email
        $existingUser = $user->findByEmail($data["email"]);

        // Check if user exists
        if (!$existingUser) {

            echo json_encode([
                "message" => "User not found"
            ]);

            return;
        }

        // Verify password
       if (password_verify($data["password"], $existingUser["password"])) {

        // Token expiration: 24 hours
        $expiration = time() + (24 * 60 * 60);

        // Create JWT payload
        $payload = [
            "user_id" => $existingUser["id"],
            "email" => $existingUser["email"],
            "role" => $existingUser["role"],
            "exp" => $expiration
        ];

    // Generate token
        $token = JwtHelper::generateToken($payload);

        // Save session in database
        $session = new UserSession();
        $session->create(
            $existingUser["id"],
            $token,
            date("Y-m-d H:i:s", $expiration)
        );

        echo json_encode([
            "message" => "Login successful",
            "token" => $token,
            "user" => [
                "id" => $existingUser["id"],
                "name" => $existingUser["name"],
                "email" => $existingUser["email"],
                "role" => $existingUser["role"]
            ]
        ]);

    } else {
        echo json_encode([
            "message" => "Invalid password"
        ]);
    }
    }

        // Logout user
    public function logout() {

        $headers = getallheaders();

        $authHeader = $headers["Authorization"] ?? "";

        if (!$authHeader) {
            echo json_encode(["message" => "Authorization token required"]);
            return;
        }

        $token = str_replace("Bearer ", "", $authHeader);

        $session = new UserSession();

        if ($session->deleteToken($token)) {
            echo json_encode(["message" => "Logout successful"]);
        } else {
            echo json_encode(["message" => "Logout failed"]);
        }
    }
}