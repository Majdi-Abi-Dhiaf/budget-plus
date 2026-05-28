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

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/transactions", label: "Transactions", icon: "💳" },
    { href: "/budgets", label: "Budgets", icon: "💰" },
    { href: "/categories", label: "Categories", icon: "🏷️" },
    { href: "/alerts", label: "Alerts", icon: "🔔" },
  ];

  return (
    <aside className="col-12 col-md-3 col-lg-2 sidebar">
      <h4 className="mb-4">💎 Budget+</h4>

      <nav style={{ marginBottom: "32px" }}>
        {navItems.map((item) => (
          <Link key={item.href} className="sidebar-link" href={item.href}>
            <span style={{ marginRight: "10px", fontSize: "1.2em" }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={{ marginTop: "auto", paddingTop: "24px", borderTop: "1px solid var(--neutral-200)" }}>
        <button 
          className="btn btn-outline-danger w-100" 
          onClick={handleLogout}
          style={{
            borderColor: "#ef4444",
            color: "#ef4444",
            fontWeight: 600,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ef4444";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#ef4444";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
