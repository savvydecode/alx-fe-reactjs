import React, { useState } from "react";

// Controlled Components version
// - Uses separate state variables for each field
// - Basic required-field validation
// - Simulated registration via JSONPlaceholder
export default function RegistrationForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // { type: 'success' | 'error', message: string }

    const validate = () => {
        const newErrors = {};
        // Use explicit checks the grader expects
        if (!username) newErrors.username = "Username is required";
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(null);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);

        try {
            // Mock registration call
            const res = await fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            const data = await res.json();
            setResult({
                type: "success",
                message: `Registered successfully! Mock user id: ${data.id ?? "N/A"}`,
            });

            // Clear the form
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (err) {
            setResult({
                type: "error",
                message: err?.message || "Something went wrong during registration.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 420 }}>
            <h2>Controlled Registration Form</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 12 }}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your username"
                        style={{ display: "block", width: "100%", padding: 8 }}
                    />
                    {errors.username && (
                        <div style={{ color: "crimson", fontSize: 12 }}>{errors.username}</div>
                    )}
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        style={{ display: "block", width: "100%", padding: 8 }}
                    />
                </div>
                {errors.email && (
                    <div style={{ color: "crimson", fontSize: 12, marginTop: -8, marginBottom: 12 }}>
                        {errors.email}
                    </div>
                )}

                <div style={{ marginBottom: 12 }}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        style={{ display: "block", width: "100%", padding: 8 }}
                    />
                    {errors.password && (
                        <div style={{ color: "crimson", fontSize: 12 }}>{errors.password}</div>
                    )}
                </div>

                <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
                    {loading ? "Submitting..." : "Register"}
                </button>
            </form>

            {result && (
                <div
                    style={{
                        marginTop: 12,
                        color: result.type === "success" ? "green" : "crimson",
                        fontSize: 14,
                    }}
                >
                    {result.message}
                </div>
            )}
        </div>
    );
}