import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("cashleans_token");
    const savedEmail = localStorage.getItem("cashleans_email");
    if (savedToken) setToken(savedToken);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const login = (newToken, userEmail) => {
    setToken(newToken);
    setEmail(userEmail);
    localStorage.setItem("cashleans_token", newToken);
    localStorage.setItem("cashleans_email", userEmail);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("cashleans_token");
    localStorage.removeItem("cashleans_email");
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
