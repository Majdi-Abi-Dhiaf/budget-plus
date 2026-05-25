"use client";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBudgets, createBudget, deleteBudget } from "../../services/api";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
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

export default function BudgetsPage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");

    const [budgets, setBudgets] = useState<Budget[]>([]);

    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("individual");
    const [period, setPeriod] = useState<string>("monthly");
    const [limitAmount, setLimitAmount] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [message, setMessage] = useState<string>("");

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

        loadBudgets(savedUser.id, savedToken);
    }, [router]);

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

        if (!name || !limitAmount) {
            setMessage("Budget name and limit amount are required.");
            return;
        }

        const newBudget = {
            name: name,
            type: type,
            period: period,
            limit_amount: Number(limitAmount),
            start_date: startDate ? startDate : null,
            end_date: endDate ? endDate : null,
            user_id: user.id,
        };

        const data = await createBudget(newBudget, token);

        setMessage(data.message);

        setName("");
        setType("individual");
        setPeriod("monthly");
        setLimitAmount("");
        setStartDate("");
        setEndDate("");

        loadBudgets(user.id, token);
    }

    async function handleDelete(id: number) {
        if (!user) {
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete this budget?");

        if (!confirmDelete) {
            return;
        }

        const data = await deleteBudget(id, token);

        setMessage(data.message);

        loadBudgets(user.id, token);
    }

    return (
        <div className="container-fluid" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f4ff 0%, #f8f1ff 100%)", margin: 0 }}>
            <div className="row" style={{ margin: 0 }}>
                <Sidebar />

                <main className="col-md-9 col-lg-10" style={{ padding: "40px" }}>
                    <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "2px solid rgba(99, 102, 241, 0.1)" }}>
                        <h2 style={{ marginBottom: "8px" }}>💰 Budgets</h2>
                        <p className="text-muted">
                            Create and manage your personal or shared budgets.
                        </p>
                    </div>

                    {message && (
                        <div className="alert alert-info" role="alert" style={{ marginBottom: "24px" }}>
                            ✓ {message}
                        </div>
                    )}

                    <div className="card budget-card p-4 mb-4">
                        <h5 className="mb-3">Add New Budget</h5>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label">Budget Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Example: Monthly Budget"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-2">
                                    <label className="form-label">Type</label>
                                    <select
                                        className="form-select"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="individual">Individual</option>
                                        <option value="shared">Shared</option>
                                    </select>
                                </div>

                                <div className="col-md-2">
                                    <label className="form-label">Period</label>
                                    <select
                                        className="form-select"
                                        value={period}
                                        onChange={(e) => setPeriod(e.target.value)}
                                    >
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>

                                <div className="col-md-2">
                                    <label className="form-label">Limit Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="500"
                                        value={limitAmount}
                                        onChange={(e) => setLimitAmount(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3 d-flex align-items-end">
                                    <button type="submit" className="btn btn-budget w-100">
                                        Add Budget
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="card budget-card p-4">
                        <h5 className="mb-3">Budgets List</h5>

                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Period</th>
                                        <th>Limit</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {budgets.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center text-muted">
                                                No budgets found.
                                            </td>
                                        </tr>
                                    ) : (
                                        budgets.map((budget) => (
                                            <tr key={budget.id}>
                                                <td>{budget.id}</td>
                                                <td>{budget.name}</td>
                                                <td>
                                                    <span
                                                        className={
                                                            budget.type === "shared"
                                                                ? "badge bg-primary"
                                                                : "badge bg-info text-dark"
                                                        }
                                                    >
                                                        {budget.type}
                                                    </span>
                                                </td>
                                                <td>{budget.period}</td>
                                                <td>{budget.limit_amount} DT</td>
                                                <td>{budget.start_date || "-"}</td>
                                                <td>{budget.end_date || "-"}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(budget.id)}
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
