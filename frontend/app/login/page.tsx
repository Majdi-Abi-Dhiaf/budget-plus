"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e : any) {
    e.preventDefault();

    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card budget-card p-4" style={{ maxWidth: "430px", width: "100%" }}>
        <h2 className="text-center mb-2">Welcome to Budget+</h2>
        <p className="text-center text-muted mb-4">
          Connect to manage your personal and shared budget.
        </p>

        {message && <div className="alert alert-danger">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>

          <button className="btn btn-budget w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}