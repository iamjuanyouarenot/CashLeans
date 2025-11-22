import { createContext, useContext, useState, useEffect } from "react";
import { api, setAuthToken } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
  }, []);

  const login = async (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    const res = await api.post("/auth/token", formData);
    setAuthToken(res.data.access_token);
    setUser({ email });
  };

  const register = async (email, fullName, password) => {
    await api.post("/auth/register", {
      email,
      full_name: fullName,
      password,
    });
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
