import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEdit2, FiCheck, FiArrowLeft } from "react-icons/fi";
import PortfolioView from "../components/portfolio/PortfolioView";
import { portfolioAPI } from "../utils/api";
import toast from "react-hot-toast";

const PreviewPage = () => {
  const [data, setData] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const draft = sessionStorage.getItem("portfolioDraft");
    if (!draft) { navigate("/create"); return; }
    setData(JSON.parse(draft));
  }, [navigate]);

  const handlePublish = async () => {
    if (!data) return;
    setPublishing(true);
    try {
      const payload = { ...data, isPublished: true };
      await portfolioAPI.create(payload);
      sessionStorage.removeItem("portfolioDraft");
      toast.success("Portfolio published! 🎉");
      navigate(`/portfolio/${data.username}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to publish. Please try again.";
      toast.error(msg);
    } finally {
      setPublishing(false);
    }
  };

  if (!data) return null;

  return (
    <div>
      {/* Preview Banner */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "1rem 1.5rem", position: "sticky", top: 64, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ background: "rgba(245,158,11,0.15)", color: "var(--warning)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "999px", padding: "0.2rem 0.75rem", fontSize: "0.8rem", fontWeight: 600 }}>
              PREVIEW MODE
            </span>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}>This is how your portfolio will look to visitors</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/create" className="btn btn-secondary btn-sm"><FiArrowLeft /> Edit</Link>
            <button className="btn btn-primary" onClick={handlePublish} disabled={publishing}>
              {publishing ? "Publishing..." : <><FiCheck /> Publish Portfolio</>}
            </button>
          </div>
        </div>
      </div>
      <PortfolioView data={data} isPreview={true} />
    </div>
  );
};

export default PreviewPage;
