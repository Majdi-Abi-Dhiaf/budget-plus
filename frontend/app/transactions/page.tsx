"use client";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    getTransactions,
    createTransaction,
    deleteTransaction,
    getCategories,
    getBudgets,
} from "../../services/api";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};
type Category = {
    id: number;
    name: string;
    type: string;
    user_id: number | null;
};
type Transaction = {
    id: number;
    type: string;
    amount: number | string;
    description: string;
    date_transaction: string;
    category_id: number | null;
    budget_id: number | null;
    category_name?: string;
    budget_name?: string;
};
type Budget = {
    id: number;
    name: string;
    type: string;
    period: string;
    limit_amount: number | string;
    start_date: string | null;
    end_date: string | null;
    user_id: number;
};

export default function TransactionsPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [type, setType] = useState<string>("expense");
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dateTransaction, setDateTransaction] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [budgetId, setBudgetId] = useState<string>("");

    const [message, setMessage] = useState<string>("");
    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUserText = localStorage.getItem("user");

        if (!savedToken || !savedUserText) {
            router.push("/login");
            return;
        }

        const savedUser: User = JSON.parse(savedUserText);

        setUser(savedUser);
        setToken(savedToken);

        loadTransactions(savedUser.id, savedToken);
        loadCategories(savedUser.id, savedToken);
        loadBudgets(savedUser.id, savedToken);
    }, [router]);

    async function loadTransactions(userId: number, userToken: string) {
        const data = await getTransactions(userId, userToken);

        if (data.transactions) {
            setTransactions(data.transactions);
        }
    }
    async function loadCategories(userId: number, userToken: string) {
        const data = await getCategories(userId, userToken);

        if (data.categories) {
            setCategories(data.categories);
        }
    }
    async function loadBudgets(userId: number, userToken: string) {
        const data = await getBudgets(userId, userToken);

        if (data.budgets) {
            setBudgets(data.budgets);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user) {
            return;
        }

        if (!amount || !dateTransaction) {
            setMessage("Amount and date are required.");
            return;
        }

        const newTransaction = {
            type: type,
            amount: Number(amount),
            description: description,
            date_transaction: dateTransaction,
            user_id: user.id,
            category_id: categoryId ? Number(categoryId) : null,
            budget_id: budgetId ? Number(budgetId) : null,
        };

        const data = await createTransaction(newTransaction, token);

        setMessage(data.message);

        setAmount("");
        setDescription("");
        setDateTransaction("");
        setCategoryId("");
        setBudgetId("");

        loadTransactions(user.id, token);
    }

    async function handleDelete(id: number) {
        if (!user) {
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete this transaction?");

        if (!confirmDelete) {
            return;
        }

        const data = await deleteTransaction(id, token);

        setMessage(data.message);

        loadTransactions(user.id, token);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-9 col-lg-10 p-4">
                    <div className="mb-4">
                        <h2>Transactions</h2>
                        <p className="text-muted">
                            Add, view, and delete your income and expenses.
                        </p>
                    </div>

                    {message && (
                        <div className="alert alert-info" role="alert">
                            {message}
                        </div>
                    )}

                    <div className="card budget-card p-4 mb-4">
                        <h5 className="mb-3">Add New Transaction</h5>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label">Type</label>
                                    <select
                                        className="form-select"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Example: 250"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dateTransaction}
                                        onChange={(e) => setDateTransaction(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Example: Food"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                    >
                                        <option value="">Select category</option>

                                        {categories
                                            .filter((category) => category.type === type)
                                            .map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Budget</label>
                                    <select
                                        className="form-select"
                                        value={budgetId}
                                        onChange={(e) => setBudgetId(e.target.value)}
                                    >
                                        <option value="">Select budget</option>

                                        {budgets.map((budget) => (
                                            <option key={budget.id} value={budget.id}>
                                                {budget.name} - {budget.limit_amount} DT
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-3 d-flex align-items-end">
                                    <button type="submit" className="btn btn-budget w-100">
                                        Add Transaction
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="card budget-card p-4">
                        <h5 className="mb-3">Transactions List</h5>

                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Category</th>
                                        <th>Budget</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center text-muted">
                                                No transactions found.
                                            </td>
                                        </tr>
                                    ) : (
                                        transactions.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td>{transaction.id}</td>
                                                <td>
                                                    <span
                                                        className={
                                                            transaction.type === "income"
                                                                ? "badge bg-success"
                                                                : "badge bg-danger"
                                                        }
                                                    >
                                                        {transaction.type}
                                                    </span>
                                                </td>
                                                <td>{transaction.amount} DT</td>
                                                <td>{transaction.description}</td>
                                                <td>{transaction.date_transaction}</td>
                                                <td>{transaction.category_name || "-"}</td>
                                                <td>{transaction.budget_name || "-"}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(transaction.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}