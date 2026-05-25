# Budget+ — Backend Documentation

## Project Overview

Budget+ is a collaborative budget management web application developed as an engineering project.

The application allows users to:

* Manage personal and shared budgets
* Track incomes and expenses
* Create categories
* View dashboard statistics
* Receive budget alerts
* Collaborate on shared budgets
* Manage users and roles

---

# Project Architecture

## Frontend

* Next.js
* React


## Backend

* PHP MVC Architecture
* REST API
* JWT Authentication
* Sessions

## Database

* MySQL

---

# Backend Folder Structure

```txt
backend/
│
├── app/
│   ├── controllers/
│   ├── models/
│   └── core/
│
├── config/
├── public/
└── routes/
```

---

# MVC Architecture

## Models

Responsible for database operations.

Examples:

* User.php
* Budget.php
* Transaction.php
* Category.php
* Alert.php

## Controllers

Responsible for API logic.

Examples:

* AuthController.php
* BudgetController.php
* TransactionController.php
* CategoryController.php
* DashboardController.php

## Core

Contains system utilities.

Examples:

* Database.php
* JwtHelper.php
* AuthMiddleware.php

---

# Database Documentation

## Database Name

```sql
budget_plus
```

---

# Tables

## users

Stores user information.

| Field      | Type      |
| ---------- | --------- |
| id         | INT       |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| role       | ENUM      |
| status     | ENUM      |
| created_at | TIMESTAMP |

---

## categories

Stores income and expense categories.

| Field   | Type    |
| ------- | ------- |
| id      | INT     |
| name    | VARCHAR |
| type    | ENUM    |
| user_id | INT     |

---

## budgets

Stores user budgets.

| Field        | Type    |
| ------------ | ------- |
| id           | INT     |
| name         | VARCHAR |
| type         | ENUM    |
| period       | ENUM    |
| limit_amount | DECIMAL |
| start_date   | DATE    |
| end_date     | DATE    |
| user_id      | INT     |

---

## transactions

Stores incomes and expenses.

| Field            | Type    |
| ---------------- | ------- |
| id               | INT     |
| type             | ENUM    |
| amount           | DECIMAL |
| description      | TEXT    |
| date_transaction | DATE    |
| user_id          | INT     |
| category_id      | INT     |
| budget_id        | INT     |

---

## alerts

Stores budget alerts.

| Field      | Type      |
| ---------- | --------- |
| id         | INT       |
| user_id    | INT       |
| budget_id  | INT       |
| type       | VARCHAR   |
| message    | TEXT      |
| created_at | TIMESTAMP |

---

## user_sessions

Stores JWT sessions.

| Field      | Type      |
| ---------- | --------- |
| id         | INT       |
| user_id    | INT       |
| token      | TEXT      |
| created_at | TIMESTAMP |
| expires_at | DATETIME  |

---

# Implemented Features

## Authentication

* Register API
* Login API
* JWT Authentication
* Logout API
* Session management
* Password hashing

---

## Categories

* Create category
* Get categories
* Update category
* Delete category

---

## Budgets

* Create budget
* Get budgets
* Update budget
* Delete budget

---

## Transactions

* Create transaction
* Get transactions
* Update transaction
* Delete transaction

---

## Dashboard

* Total income
* Total expense
* Balance
* Budget percentage

---

## Alerts

* Budget exceeded alerts
* Alert retrieval

---

## Admin Features

* Get all users
* Change user role
* Change user status
* Protected admin routes

---

# API Routes

## Authentication

| Method | Route     |
| ------ | --------- |
| POST   | /register |
| POST   | /login    |
| POST   | /logout   |

---

## Categories

| Method | Route              |
| ------ | ------------------ |
| POST   | /categories/create |
| GET    | /categories        |
| POST   | /categories/update |
| GET    | /categories/delete |

---

## Budgets

| Method | Route           |
| ------ | --------------- |
| POST   | /budgets/create |
| GET    | /budgets        |
| POST   | /budgets/update |
| GET    | /budgets/delete |

---

## Transactions

| Method | Route                |
| ------ | -------------------- |
| POST   | /transactions/create |
| GET    | /transactions        |
| POST   | /transactions/update |
| GET    | /transactions/delete |

---

## Dashboard

| Method | Route            |
| ------ | ---------------- |
| GET    | /dashboard/stats |

---

## Alerts

| Method | Route   |
| ------ | ------- |
| GET    | /alerts |

---

## Admin

| Method | Route         |
| ------ | ------------- |
| GET    | /users        |
| POST   | /users/status |
| POST   | /users/role   |

---

# JWT Authentication

Protected routes require:

```txt
Authorization: Bearer YOUR_TOKEN
```

---

# Example Login Response

```json
{
  "message": "Login successful",
  "token": "xxxxx.yyyyy.zzzzz"
}
```

---

# Backend Startup

## Run XAMPP

* Start Apache
* Start MySQL

## Backend URL

```txt
http://localhost/budget-plus/backend/public/
```

---

# Frontend Integration Instructions

The frontend developer must:

1. Use fetch() or axios
2. Send requests to backend API
3. Save JWT token after login
4. Send token in Authorization header
5. Create protected frontend pages

---

# Example Frontend Fetch

```javascript
fetch("http://localhost/budget-plus/backend/public/index.php?url=login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "majdi@gmail.com",
    password: "123456"
  })
})
```

---




---

# Contributors

* Backend Developer: Majdi abidhiaf
* Frontend Developer: chayma bouazizi

---


