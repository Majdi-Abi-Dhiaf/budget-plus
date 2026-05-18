<?php

// Headers for API JSON and Next.js connection
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

// Stop preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

// Controllers
require_once __DIR__ . "/../app/controllers/AuthController.php";
require_once __DIR__ . "/../app/controllers/CategoryController.php";
require_once __DIR__ . "/../app/controllers/BudgetController.php";
require_once __DIR__ . "/../app/controllers/TransactionController.php";
require_once __DIR__ . "/../app/controllers/DashboardController.php";
require_once __DIR__ . "/../app/controllers/AlertController.php";
require_once __DIR__ . "/../app/controllers/UserController.php";

// Middleware
require_once __DIR__ . "/../app/core/AuthMiddleware.php";

// Get route from URL
$url = $_GET["url"] ?? "";

// Create controller objects
$authController = new AuthController();
$categoryController = new CategoryController();
$budgetController = new BudgetController();
$transactionController = new TransactionController();
$dashboardController = new DashboardController();
$alertController = new AlertController();
$userController = new UserController();

// API Routes
if ($url === "register") {
    $authController->register();

} elseif ($url === "login") {
    $authController->login();

} elseif ($url === "categories/create") {
    $categoryController->create();

} elseif ($url === "categories") {
    $categoryController->getAll();

} elseif ($url === "categories/update") {
    $categoryController->update();

} elseif ($url === "categories/delete") {
    $categoryController->delete();

} elseif ($url === "budgets/create") {
    $budgetController->create();

} elseif ($url === "budgets") {
    $budgetController->getAll();

} elseif ($url === "budgets/update") {
    $budgetController->update();

} elseif ($url === "budgets/delete") {
    $budgetController->delete();

} elseif ($url === "transactions/create") {
    $transactionController->create();

} elseif ($url === "transactions") {
    $transactionController->getAll();

} elseif ($url === "transactions/update") {
    $transactionController->update();

} elseif ($url === "transactions/delete") {
    $transactionController->delete();

} elseif ($url === "dashboard/stats") {
    $dashboardController->stats();

} elseif ($url === "alerts") {
    $alertController->getAll();

} elseif ($url === "users") {
    AuthMiddleware::isAdmin();
    $userController->getAll();

} elseif ($url === "users/status") {
    AuthMiddleware::isAdmin();
    $userController->updateStatus();

} elseif ($url === "users/role") {
    AuthMiddleware::isAdmin();
    $userController->updateRole();

} elseif ($url === "logout") {
    $authController->logout();
}else {
    echo json_encode([
        "message" => "API Budget+ is running"
    ]);
}