import React, { useState } from "react";
import api from "../api.js";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "No se pudo registrar el usuario."
      );
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
        <div>
          <label>Nombre completo</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
        </div>
        <div>
          <label>Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>
        )}

        <button type="submit">Registrarse</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
      </p>
    </div>
  );
}
