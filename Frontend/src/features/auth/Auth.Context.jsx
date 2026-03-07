// src/features/auth/Auth.Context.jsx

import { createContext, useState, useEffect } from "react";
import { login, register } from "./services/auth.api";

export const Authcontext = createContext();

export function Authprovider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // -----------------------------
  // LOGIN
  // -----------------------------
  const handleLogin = async (username, password) => {

    setLoading(true);

    try {

      const response = await login(username, password);

      setUser(response.user);

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

    } catch (err) {

      console.log("Login Error:", err);
      setUser(null);

    } finally {

      setLoading(false);

    }
  };

  // -----------------------------
  // REGISTER
  // -----------------------------
  const handleRegister = async (username, email, password) => {

    setLoading(true);

    try {

      const response = await register(username, email, password);

      setUser(response.user);

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

      return response.user;

    } catch (err) {

      console.log("Register Error:", err);
      setUser(null);

    } finally {

      setLoading(false);

    }
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const handleLogout = () => {

    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

  };

  // -----------------------------
  // CHECK USER ON APP START
  // -----------------------------
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    } else {

      setUser(null);

    }

    setAuthLoading(false);

  }, []);

  return (

    <Authcontext.Provider
      value={{
        user,
        loading,
        authLoading,
        handleLogin,
        handleRegister,
        handleLogout
      }}
    >

      {children}

    </Authcontext.Provider>

  );
}