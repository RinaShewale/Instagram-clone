import { createContext, useState, useEffect } from "react";
import { login, register, getme } from "./services/auth.api";

export const Authcontext = createContext()

export function Authprovider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (username, password) => {
        setLoading(true)
        try {
            const response = await login(username, password)
            setUser(response.user)
            localStorage.setItem("user", JSON.stringify(response.user))
            return response
        }
        catch (err) {
            console.log(err);

        }
        finally {
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password); // call register API
            setUser(response.user); // store the created user
            localStorage.setItem("user", JSON.stringify(response.user));
            return response;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setUser(null);                // user state clear
        localStorage.removeItem("user"); // remove saved user
    }

    
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        } else {
            // agar cookie login aahe tar fetch kar user
            async function checkUser() {
                try {
                    const user = await getme()
                    setUser(user)
                    localStorage.setItem("user", JSON.stringify(user))
                } catch (err) {
                    setUser(null)
                    localStorage.removeItem("user")
                }
            }
            checkUser()
        }
    }, [])
    return (
        <Authcontext.Provider
            value={{
                user,
                loading,
                handleLogin,
                handleRegister,
                setUser,
                handleLogout
            }}
        >
            {children}
        </Authcontext.Provider>
    )

}
