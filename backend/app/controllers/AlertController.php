<?php

require_once __DIR__ . "/../models/Alert.php";

class AlertController {

    // Get user alerts
    public function getAll() {
        $user_id = $_GET["user_id"] ?? null;

        if (!$user_id) {
            echo json_encode([
                "message" => "user_id is required"
            ]);
            return;
        }

        $alert = new Alert();

        echo json_encode([
            "alerts" => $alert->getByUser($user_id)
        ]);
    }
}