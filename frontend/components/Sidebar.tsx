"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/api";

export default function Sidebar() {
  const router = useRouter();

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
<aside className="col-12 col-md-3 col-lg-2 sidebar p-4">      <h4 className="mb-4">Budget+</h4>

      <Link className="sidebar-link" href="/dashboard">
        Dashboard
      </Link>

      <Link className="sidebar-link" href="/transactions">
        Transactions
      </Link>

      <Link className="sidebar-link" href="/budgets">
        Budgets
      </Link>

      <Link className="sidebar-link" href="/categories">
        Categories
      </Link>

      <Link className="sidebar-link" href="/alerts">
        Alerts
      </Link>

      <button className="btn btn-outline-danger w-100 mt-4" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}