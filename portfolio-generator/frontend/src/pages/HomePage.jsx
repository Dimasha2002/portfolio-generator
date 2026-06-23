import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCode, FiZap, FiShare2, FiEdit3 } from "react-icons/fi";

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="card fade-in" style={{ textAlign: "center", padding: "2rem" }}>
    <div style={{ width: 56, height: 56, background: "rgba(99,102,241,0.15)", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
      <Icon size={24} color="var(--primary)" />
    </div>
    <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "1.05rem" }}>{title}</h3>
    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</p>
  </div>
);

const HomePage = () => (
  <div>
    {/* Hero */}
    <section style={{
      minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "4rem 1.5rem", textAlign: "center",
      background: "radial-gradient(ellipse at 50% -20%, rgba(99,102,241,0.2) 0%, transparent 60%)",
    }}>
      <div style={{ maxWidth: 760 }} className="fade-in">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "999px", fontSize: "0.85rem", color: "var(--primary)", marginBottom: "2rem", fontWeight: 500 }}>
          <FiZap size={14} /> Free & Open Source
        </div>
        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Build Your Developer<br />
          <span className="gradient-text">Portfolio in Minutes</span>
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 580, margin: "0 auto 2.5rem" }}>
          Fill out a form, get a stunning public portfolio page with a shareable URL. No design skills needed.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/create" className="btn btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2rem" }}>
            Create Portfolio <FiArrowRight />
          </Link>
          <a href="#features" className="btn btn-secondary" style={{ fontSize: "1.05rem", padding: "0.9rem 2rem" }}>
            Learn More
          </a>
        </div>

        {/* URL preview */}
        <div style={{ marginTop: "3rem", padding: "0.75rem 1.5rem", background: "var(--surface)", borderRadius: "0.75rem", border: "1px solid var(--border)", display: "inline-block", fontFamily: "monospace", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          devfolio.app/portfolio/<span style={{ color: "var(--primary)", fontWeight: 600 }}>your-username</span>
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
      <div className="container">
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700, marginBottom: "3rem" }}>
          Everything you need to <span className="gradient-text">stand out</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          <Feature icon={FiEdit3} title="Easy Form" desc="Fill in your details — skills, projects, experience — with a guided multi-step form." />
          <Feature icon={FiCode} title="Public Portfolio" desc="Get a unique, shareable URL for your portfolio that anyone can visit." />
          <Feature icon={FiZap} title="Instant Preview" desc="Preview exactly how your portfolio looks before publishing it live." />
          <Feature icon={FiShare2} title="Edit Anytime" desc="Update your portfolio at any time. Changes go live immediately." />
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
      <div className="container">
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>Ready to build your portfolio?</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.05rem" }}>Takes less than 5 minutes. No signup required.</p>
        <Link to="/create" className="btn btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}>
          Get Started Free <FiArrowRight />
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;
