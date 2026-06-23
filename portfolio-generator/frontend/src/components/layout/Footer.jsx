import React from "react";
import { Link } from "react-router-dom";
import { FiCode, FiGithub } from "react-icons/fi";

const Footer = () => (
  <footer style={{
    background: "var(--surface)", borderTop: "1px solid var(--border)",
    padding: "2rem 1.5rem", marginTop: "auto",
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <FiCode color="var(--primary)" size={20} />
        <span style={{ fontWeight: 700, fontSize: "1.1rem" }} className="gradient-text">DevFolio</span>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
        Build your developer portfolio in minutes. Free forever.
      </p>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/create" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem" }}>Create Portfolio</Link>
        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.875rem", textDecoration: "none" }}>
          <FiGithub size={14} /> GitHub
        </a>
      </div>
    </div>
    <div style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
      © {new Date().getFullYear()} DevFolio. Built with MERN Stack.
    </div>
  </footer>
);

export default Footer;
