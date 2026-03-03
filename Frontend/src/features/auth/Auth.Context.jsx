// src/features/auth/Auth.Context.jsx
import { createContext, useState, useEffect } from "react";
import { login, register, getme } from "./services/auth.api";

// ✅ Capitalized context name (convention)
export const Authcontext = createContext();

export function Authprovider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);       // for login/register actions
    const [authLoading, setAuthLoading] = useState(true); // for initial getme() check

    // Login function
    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            setUser(response.user);
            localStorage.setItem("user", JSON.stringify(response.user));
        } catch (err) {
            console.log("Login Error:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            await register(username, email, password);
            const me = await getme();
            setUser(me);
            return me;
        } catch (err) {
            console.log("Register Error:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        // optionally call backend to clear cookies
    };

    // Fetch user on mount (check if already logged in)
    useEffect(() => {
        (async () => {
            try {
                const me = await getme();
                setUser(me);
            } catch {
                setUser(null);
            } finally {
                setAuthLoading(false); // done checking auth
            }
        })();
    }, []);

    return (
        <Authcontext.Provider
            value={{
                user,
                loading,
                authLoading, // expose authLoading for pages
                handleLogin,
                handleRegister,
                handleLogout,
                setUser,
                setAuthLoading
            }}
        >
            {children}
        </Authcontext.Provider>
    );
}