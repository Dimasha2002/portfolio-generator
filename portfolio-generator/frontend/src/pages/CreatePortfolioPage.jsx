import React from "react";
import { useNavigate } from "react-router-dom";
import PortfolioForm from "../components/form/PortfolioForm";
import toast from "react-hot-toast";

const CreatePortfolioPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    // Store data in sessionStorage for preview, then navigate to preview
    sessionStorage.setItem("portfolioDraft", JSON.stringify(formData));
    toast.success("Looking good! Review your portfolio.");
    navigate("/preview");
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Create Your Portfolio</h1>
        <p style={{ color: "var(--text-muted)" }}>Fill in the details below to generate your portfolio</p>
      </div>
      <div className="card" style={{ padding: "2.5rem" }}>
        <PortfolioForm onSubmit={handleSubmit} submitLabel="Preview Portfolio" />
      </div>
    </div>
  );
};

export default CreatePortfolioPage;
