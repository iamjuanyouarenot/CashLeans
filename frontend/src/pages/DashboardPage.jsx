import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { email, logout } = useAuth();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {email}</p>

      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/transactions" style={{ marginRight: "1rem" }}>
          Ver transacciones
        </Link>
        <Link to="/upload" style={{ marginRight: "1rem" }}>
          Subir recibo
        </Link>
      </nav>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
