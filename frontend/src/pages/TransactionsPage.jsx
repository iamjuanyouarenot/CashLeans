import React, { useEffect, useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function TransactionsPage() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await api.get("/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchTx();
  }, [token]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Transacciones</h1>
      <p>
        <Link to="/dashboard">Volver al dashboard</Link>
      </p>

      {transactions.length === 0 && <p>No hay transacciones.</p>}

      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {tx.date} - {tx.type} - {tx.category} - {tx.amount} -{" "}
            {tx.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
