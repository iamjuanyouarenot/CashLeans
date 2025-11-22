import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Página de Login</h1>
      <p>Login funcionando.</p>
    </div>
  );
}
