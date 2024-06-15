import { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { gsap } from "gsap";

export default function Auth() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

    const pillRef = useRef(null);
    const loginRef = useRef(null);
    const signupRef = useRef(null);

    useEffect(() => {
        const target = isLogIn ? loginRef.current : signupRef.current;
        gsap.to(pillRef.current, {
            x: target.offsetLeft,
            width: target.offsetWidth,
            duration: 0.35,
            ease: "power2.out"
        });
    }, [isLogIn]);

    const viewLogin = (status) => {
        setError(null);
        setIsLogIn(status);
    };

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();
        if (!isLogIn && password !== confirmPassword) {
            setError("Passwords don't match");
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
                    <ul className="auth-options-list">
                        <div ref={pillRef} className="pill" />
                        <li ref={loginRef} onClick={() => viewLogin(true)} className={isLogIn ? "active" : ""}>
                            Log in
                        </li>
                        <li ref={signupRef} onClick={() => viewLogin(false)} className={!isLogIn ? "active" : ""}>
                            Sign up
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
