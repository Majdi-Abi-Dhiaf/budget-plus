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
    <div className="container-fluid">
      <div className="row">
        
        <Sidebar/>

<main className="col-12 col-md-9 col-lg-10 p-4">          <div className="d-flex justify-content-between align-items-center mb-4">
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
                <StatCard title="Total Income" value={stats.total_income} suffix="DT" />
              </div>

              <div className="col-md-3">
                <StatCard title="Total Expenses" value={stats.total_expense} suffix="DT" />
              </div>

              <div className="col-md-3">
                <StatCard title="Balance" value={stats.balance} suffix="DT" />
              </div>

              <div className="col-md-3">
                <StatCard title="Budget Used" value={stats.budget_percentage} suffix="%" />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}