"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAlerts } from "../../services/api";
import Sidebar from "../../components/Sidebar";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Alert = {
  id: number;
  user_id: number;
  budget_id: number;
  type: string;
  message: string;
  created_at: string;
};

export default function AlertsPage() {
  const router = useRouter();

  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUserText = localStorage.getItem("user");

    if (!token || !savedUserText) {
      router.push("/login");
      return;
    }

    const savedUser: User = JSON.parse(savedUserText);
    const authToken = token;

    async function loadAlerts() {
      const data = await getAlerts(savedUser.id, authToken);

      if (data.alerts) {
        setAlerts(data.alerts);
      }
    }

    loadAlerts();
  }, [router]);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f4ff 0%, #f8f1ff 100%)", margin: 0 }}>
      <div className="row" style={{ margin: 0 }}>
        <Sidebar />

        <main className="col-md-9 col-lg-10" style={{ padding: "40px" }}>
          <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "2px solid rgba(99, 102, 241, 0.1)" }}>
            <h2 style={{ marginBottom: "8px" }}>🔔 Alerts</h2>
            <p className="text-muted">
              View budget exceeded alerts and important financial notifications.
            </p>
          </div>

          <div className="card budget-card p-4">
            <h5 className="mb-3">Alerts List</h5>

            {alerts.length === 0 ? (
              <div className="alert alert-success">
                ✓ No alerts found. Your budgets are under control!
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Budget ID</th>
                      <th>Type</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {alerts.map((alert) => (
                      <tr key={alert.id}>
                        <td>{alert.id}</td>
                        <td>{alert.budget_id}</td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            {alert.type}
                          </span>
                        </td>
                        <td>{alert.message}</td>
                        <td>{alert.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
