import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
    </div>
  );
}

