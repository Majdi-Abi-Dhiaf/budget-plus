<?php

require_once __DIR__ . "/../core/Database.php";

class Dashboard {

    private $conn;

    public function __construct() {
        // Connect to database
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Get dashboard statistics for one user
    public function getStats($user_id) {

        // Calculate total income
        $incomeSql = "SELECT SUM(amount) as total_income 
                      FROM transactions 
                      WHERE user_id = :user_id AND type = 'income'";

        $incomeStmt = $this->conn->prepare($incomeSql);
        $incomeStmt->execute([":user_id" => $user_id]);
        $income = $incomeStmt->fetch(PDO::FETCH_ASSOC);

        // Calculate total expenses
        $expenseSql = "SELECT SUM(amount) as total_expense 
                       FROM transactions 
                       WHERE user_id = :user_id AND type = 'expense'";

        $expenseStmt = $this->conn->prepare($expenseSql);
        $expenseStmt->execute([":user_id" => $user_id]);
        $expense = $expenseStmt->fetch(PDO::FETCH_ASSOC);

        // Calculate total budget limit
        $budgetSql = "SELECT SUM(limit_amount) as total_budget 
                      FROM budgets 
                      WHERE user_id = :user_id";

        $budgetStmt = $this->conn->prepare($budgetSql);
        $budgetStmt->execute([":user_id" => $user_id]);
        $budget = $budgetStmt->fetch(PDO::FETCH_ASSOC);

        $totalIncome = $income["total_income"] ?? 0;
        $totalExpense = $expense["total_expense"] ?? 0;
        $totalBudget = $budget["total_budget"] ?? 0;

        // Calculate balance
        $balance = $totalIncome - $totalExpense;

        // Calculate budget percentage
        $budgetPercentage = 0;

        if ($totalBudget > 0) {
            $budgetPercentage = ($totalExpense / $totalBudget) * 100;
        }

        return [
            "total_income" => $totalIncome,
            "total_expense" => $totalExpense,
            "balance" => $balance,
            "total_budget" => $totalBudget,
            "budget_percentage" => round($budgetPercentage, 2)
        ];
    }
}