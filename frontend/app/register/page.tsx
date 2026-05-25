"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../services/api";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!name || !email || !password) {
            setMessage("All fields are required.");
            return;
        }

        const data = await registerUser(name, email, password);

        if (data.token && data.user) {
            // Save token and user in browser
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Go directly to dashboard
            router.push("/dashboard");
        } else {
            setMessage(data.message);
        }
    }

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card budget-card p-4" style={{ maxWidth: "460px", width: "100%" }}>
                <h2 className="text-center mb-2">Create Account</h2>
                <p className="text-center text-muted mb-4">
                    Join Budget+ and start managing your money smarter.
                </p>

                {message && (
                    <div className="alert alert-info" role="alert">
                        {message}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Example: Majdi Abidhiaf"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Choose a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-budget w-100" type="submit">
                        Register
                    </button>
                </form>

                <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <Link href="/login" className="text-decoration-none">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}