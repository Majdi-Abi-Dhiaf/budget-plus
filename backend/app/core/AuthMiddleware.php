<?php

require_once __DIR__ . "/JwtHelper.php";
require_once __DIR__ . "/../models/UserSession.php";

class AuthMiddleware {

    // Check if user is authenticated
    public static function authenticate() {

        $headers = getallheaders();

        $authHeader = $headers["Authorization"] ?? "";

        if (!$authHeader) {
            echo json_encode(["message" => "Authorization token required"]);
            exit;
        }

        $token = str_replace("Bearer ", "", $authHeader);

        $payload = JwtHelper::verifyToken($token);

        if (!$payload) {
            echo json_encode(["message" => "Invalid or expired token"]);
            exit;
        }

        $session = new UserSession();
        $savedSession = $session->findToken($token);

        if (!$savedSession) {
            echo json_encode(["message" => "Session expired or logged out"]);
            exit;
        }

        return $payload;
    }

    // Check admin role
    public static function isAdmin() {

        $payload = self::authenticate();

        if ($payload["role"] !== "admin") {
            echo json_encode(["message" => "Access denied. Admin only."]);
            exit;
        }

        return $payload;
    }
}