const API_URL = "http://localhost/budget-plus/backend/public/index.php?url=";

// Login user
export async function loginUser(email: any, password: any) {
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}

// Register user
export async function registerUser(name: any, email: any, password: any) {
  const response = await fetch(API_URL + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  return response.json();
}

// Get dashboard stats
export async function getDashboardStats(userId: any, token: any) {
  const response = await fetch(API_URL + `dashboard/stats&user_id=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

// Logout user
export async function logoutUser(token: any) {
  const response = await fetch(API_URL + "logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

// Get all transactions for one user
export async function getTransactions(userId: number, token: string) {
  const response = await fetch(API_URL + `transactions&user_id=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

// Create new transaction
export async function createTransaction(
  transaction: {
    type: string;
    amount: number;
    description: string;
    date_transaction: string;
    user_id: number;
    category_id: number | null;
    budget_id: number | null;
  },
  token: string
) {
  const response = await fetch(API_URL + "transactions/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transaction),
  });

  return response.json();
}

// Delete transaction
export async function deleteTransaction(id: number, token: string) {
  const response = await fetch(API_URL + `transactions/delete&id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}



// Get all categories for one user
export async function getCategories(userId: number, token: string) {
  const response = await fetch(API_URL + `categories&user_id=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

// Create new category
export async function createCategory(
  category: {
    name: string;
    type: string;
    user_id: number;
  },
  token: string
) {
  const response = await fetch(API_URL + "categories/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  return response.json();
}

// Delete category
export async function deleteCategory(id: number, token: string) {
  const response = await fetch(API_URL + `categories/delete&id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}