import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Auth() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

    const viewLogin = (status) => {
        setError(null);
        setIsLogIn(status);
    };

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();
        if (!isLogIn && password !== confirmPassword) {
            setError("Passwords dont match");
            return;
        }
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            }
        );
        const data = await response.json();
        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie("Email", data.email);
            setCookie("AuthToken", data.token);
            window.location.reload();
        }
    };
    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{isLogIn ? "Log in" : "Sign up"}</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogIn && (
                        <input
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}
                    <input
                        type="submit"
                        onClick={(e) =>
                            handleSubmit(e, isLogIn ? "login" : "signup")
                        }
                        className="create"
                    />
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button
                        onClick={() => viewLogin(false)}
                        style={{
                            backgroundColor: isLogIn
                                ? "rgb(255,255,255)"
                                : "rgb(188,188,188)",
                        }}
                    >
                        Sign up
                    </button>
                    <button
                        onClick={() => viewLogin(true)}
                        style={{
                            backgroundColor: !isLogIn
                                ? "rgb(255,255,255)"
                                : "rgb(188,188,188)",
                        }}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}
