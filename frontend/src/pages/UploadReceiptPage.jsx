import React, { useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function UploadReceiptPage() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setError(null);
    setText("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/receipts/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setText(res.data.text);
    } catch (err) {
      console.error(err);
      setError("No se pudo procesar el recibo.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Subir recibo</h1>
      <p>
        <Link to="/dashboard">Volver al dashboard</Link>
      </p>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0] || null)}
        />
        <button type="submit" disabled={!file}>
          Enviar
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {text && (
        <>
          <h2>Texto extraído:</h2>
          <pre>{text}</pre>
        </>
      )}
    </div>
  );
}
