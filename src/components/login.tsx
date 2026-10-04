import { useState } from "react";
import { login } from "../services/api/auth"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setError("");

        try {
            await login(username, password);

            alert("Login successful!");
        } catch (err) {
            setError("Invalid username or password");
        }
    }

    return (
        <div>
            <h1>College ERP</h1>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">Login</button>

                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Login;