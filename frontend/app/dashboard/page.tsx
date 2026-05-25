"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardStats, logoutUser } from "../../services/api";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Stats = {
  total_income: number | string;
  total_expense: number | string;
  balance: number | string;
  total_budget: number | string;
  budget_percentage: number | string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUserText = localStorage.getItem("user");

    if (!token || !savedUserText) {
      router.push("/login");
      return;
    }

    const savedUser: User = JSON.parse(savedUserText);
    setUser(savedUser);

    async function loadStats() {
      const data = await getDashboardStats(savedUser.id, token);
      setStats(data.stats);
    }

    loadStats();
  }, [router]);

  async function handleLogout() {
    const token = localStorage.getItem("token");

    if (token) {
      await logoutUser(token);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3 col-lg-2 sidebar p-4">
          <h4 className="mb-4">Budget+</h4>

          <a className="sidebar-link" href="/dashboard">Dashboard</a>
          <a className="sidebar-link" href="/transactions">Transactions</a>
          <a className="sidebar-link" href="/budgets">Budgets</a>
          <a className="sidebar-link" href="/categories">Categories</a>

          <button className="btn btn-outline-danger w-100 mt-4" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="col-md-9 col-lg-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Dashboard</h2>
              <p className="text-muted">
                Welcome back, {user?.name}. Here is your financial overview.
              </p>
            </div>
          </div>

          {!stats ? (
            <p>Loading...</p>
          ) : (
            <div className="row g-4">
              <div className="col-md-3">
                <div className="stat-card">
                  <p className="text-muted">Total Income</p>
                  <h3>{stats.total_income} DT</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="stat-card">
                  <p className="text-muted">Total Expenses</p>
                  <h3>{stats.total_expense} DT</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="stat-card">
                  <p className="text-muted">Balance</p>
                  <h3>{stats.balance} DT</h3>
                </div>
              </div>

              <div className="col-md-3">
                <div className="stat-card">
                  <p className="text-muted">Budget Used</p>
                  <h3>{stats.budget_percentage}%</h3>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}