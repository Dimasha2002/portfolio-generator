import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PortfolioForm from "../components/form/PortfolioForm";
import Spinner from "../components/common/Spinner";
import { portfolioAPI } from "../utils/api";
import toast from "react-hot-toast";

const EditPortfolioPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await portfolioAPI.getByUsername(username);
        setPortfolio(res.data.data);
      } catch (err) {
        toast.error("Portfolio not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [username, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await portfolioAPI.update(username, formData);
      toast.success("Portfolio updated!");
      navigate(`/portfolio/${username}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update portfolio";
      toast.error(msg);
      throw err;
    }
  };

  if (loading) return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner /></div>;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Edit Portfolio</h1>
        <p style={{ color: "var(--text-muted)" }}>Updating <strong style={{ color: "var(--primary)" }}>@{username}</strong></p>
      </div>
      <div className="card" style={{ padding: "2.5rem" }}>
        {portfolio && <PortfolioForm onSubmit={handleSubmit} initialData={portfolio} submitLabel="Save Changes" />}
      </div>
    </div>
  );
};

export default EditPortfolioPage;
