<?php

require_once __DIR__ . "/../models/Dashboard.php";

class DashboardController {

    // Get dashboard data
    public function stats() {

        // Get user_id from URL
        $user_id = $_GET["user_id"] ?? null;

        if (!$user_id) {
            echo json_encode([
                "message" => "user_id is required"
            ]);
            return;
        }

        // Create Dashboard model
        $dashboard = new Dashboard();

        // Return statistics as JSON
        echo json_encode([
            "stats" => $dashboard->getStats($user_id)
        ]);
    }
}