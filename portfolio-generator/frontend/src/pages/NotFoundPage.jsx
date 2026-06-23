import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFoundPage = () => (
  <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
    <h1 style={{ fontSize: "6rem", fontWeight: 800, lineHeight: 1, marginBottom: "1rem" }} className="gradient-text">404</h1>
    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Page Not Found</h2>
    <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>The page you are looking for does not exist.</p>
    <Link to="/" className="btn btn-primary"><FiHome /> Go Home</Link>
  </div>
);

export default NotFoundPage;
