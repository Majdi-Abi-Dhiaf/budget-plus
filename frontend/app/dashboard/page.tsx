"use client";

import Sidebar from "../../components/Sidebar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardStats } from "../../services/api";
import StatCard from "../../components/Statcard";
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



  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f4ff 0%, #f8f1ff 100%)" }}>
      <div className="row" style={{ margin: 0 }}>
        <Sidebar />

        <main className="col-12 col-md-9 col-lg-10" style={{ padding: "40px" }}>
          <div style={{ marginBottom: "48px", paddingBottom: "24px", borderBottom: "2px solid rgba(99, 102, 241, 0.1)" }}>
            <h2 style={{ marginBottom: "8px" }}>📈 Dashboard</h2>
            <p className="text-muted" style={{ fontSize: "1rem", marginBottom: 0 }}>
              Welcome back, <strong>{user?.name}</strong>. Here is your financial overview.
            </p>
          </div>

          {!stats ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}>
                <p style={{ fontSize: "1.1rem", color: "var(--neutral-500)" }}>⏳ Loading your financial data...</p>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <StatCard 
                  title="Total Income" 
                  value={stats.total_income} 
                  suffix="DT"
                  icon="📈"
                />
              </div>

              <div className="col-lg-3 col-md-6">
                <StatCard 
                  title="Total Expenses" 
                  value={stats.total_expense} 
                  suffix="DT"
                  icon="💸"
                />
              </div>

              <div className="col-lg-3 col-md-6">
                <StatCard 
                  title="Balance" 
                  value={stats.balance} 
                  suffix="DT"
                  icon="💎"
                />
              </div>

              <div className="col-lg-3 col-md-6">
                <StatCard 
                  title="Budget Used" 
                  value={stats.budget_percentage} 
                  suffix="%"
                  icon="📊"
                />
              </div>
            </div>
          )}

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>
        </main>
      </div>
    </div>
  );
}
