import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiCode, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Create Portfolio" },
  ];

  return (
    <nav style={{
      background: "rgba(15,23,42,0.95)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100,
      padding: "0 1.5rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontWeight: 800, fontSize: "1.25rem" }}>
          <FiCode color="var(--primary)" size={24} />
          <span className="gradient-text">DevFolio</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} style={{
              textDecoration: "none", color: location.pathname === link.to ? "var(--primary)" : "var(--text-muted)",
              fontWeight: 500, transition: "color 0.2s", fontSize: "0.95rem",
            }}>
              {link.label}
            </Link>
          ))}
          <Link to="/create" className="btn btn-primary btn-sm">Get Started</Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", display: "none" }} className="mobile-menu-btn">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ padding: "1rem 0", borderTop: "1px solid var(--border)" }}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "0.75rem 0", textDecoration: "none",
              color: location.pathname === link.to ? "var(--primary)" : "var(--text-muted)", fontWeight: 500,
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
