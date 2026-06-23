import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import PortfolioView from "../components/portfolio/PortfolioView";
import Spinner from "../components/common/Spinner";
import { portfolioAPI } from "../utils/api";

const PublicPortfolioPage = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await portfolioAPI.getByUsername(username);
        setPortfolio(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Portfolio not found");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [username]);

  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner message="Loading portfolio..." /></div>;

  if (error) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "2rem" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Portfolio Not Found</h2>
      <p style={{ color: "var(--text-muted)" }}>No portfolio found for <strong>@{username}</strong></p>
      <Link to="/" className="btn btn-primary"><FiArrowLeft /> Go Home</Link>
    </div>
  );

  return (
    <div>
      {/* Floating edit button */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 100, display: "flex", gap: "0.75rem" }}>
        <Link to={`/edit/${username}`} className="btn btn-secondary btn-sm" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          <FiEdit2 size={14} /> Edit
        </Link>
      </div>
      <PortfolioView data={portfolio} />
    </div>
  );
};

export default PublicPortfolioPage;
