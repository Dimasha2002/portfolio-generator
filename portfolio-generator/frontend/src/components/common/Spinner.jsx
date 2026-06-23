import React from "react";

const Spinner = ({ size = 40, message = "Loading..." }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem", gap: "1rem" }}>
    <div style={{
      width: size, height: size,
      border: "3px solid var(--border)",
      borderTop: "3px solid var(--primary)",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
    {message && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{message}</p>}
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Spinner;
