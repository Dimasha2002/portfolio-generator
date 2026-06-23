import React from "react";
import { FiGithub, FiLinkedin, FiGlobe, FiMail, FiExternalLink } from "react-icons/fi";

const PortfolioView = ({ data, isPreview = false }) => {
  const { fullName, title, bio, profileImage, contact, skills, projects, experience, certificates } = data;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Header / Hero */}
      <header style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        padding: "5rem 1.5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          {profileImage && (
            <img src={profileImage} alt={fullName} style={{
              width: 120, height: 120, borderRadius: "50%", objectFit: "cover",
              border: "3px solid var(--primary)", marginBottom: "1.5rem",
              boxShadow: "0 0 30px rgba(99,102,241,0.4)",
            }} onError={e => { e.target.style.display = "none"; }} />
          )}
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "0.75rem" }}>
            {fullName || "Your Name"}
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--primary)", fontWeight: 600, marginBottom: "1rem" }}>
            {title || "Developer"}
          </p>
          {bio && <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem", maxWidth: 580, margin: "0 auto 1.5rem" }}>{bio}</p>}

          {/* Contact Links */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {contact?.email && (
              <a href={`mailto:${contact.email}`} style={linkStyle}><FiMail size={16} /> {contact.email}</a>
            )}
            {contact?.github && (
              <a href={contact.github} target="_blank" rel="noreferrer" style={linkStyle}><FiGithub size={16} /> GitHub</a>
            )}
            {contact?.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer" style={linkStyle}><FiLinkedin size={16} /> LinkedIn</a>
            )}
            {contact?.website && (
              <a href={contact.website} target="_blank" rel="noreferrer" style={linkStyle}><FiGlobe size={16} /> Website</a>
            )}
          </div>

          {/* views removed per request */}
        </div>
      </header>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Skills */}
        {skills?.length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
            <h2 className="section-title">Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {skills.map((skill, i) => (
                <span key={i} className="tag" style={{ fontSize: "0.9rem", padding: "0.4rem 1rem" }}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.filter(p => p.name).length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
            <h2 className="section-title">Projects</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {projects.filter(p => p.name).map((project, i) => (
                <div key={i} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text)" }}>{project.name}</h3>
                  {project.description && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, flex: 1, marginBottom: "1rem" }}>{project.description}</p>}
                  {project.techStack?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                      {project.techStack.map((tech, j) => (
                        <span key={j} style={{ padding: "0.2rem 0.6rem", background: "var(--surface-2)", borderRadius: "4px", fontSize: "0.75rem", color: "var(--text-muted)" }}>{tech}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm"><FiGithub size={14} /> Code</a>
                    )}
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm"><FiExternalLink size={14} /> Demo</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience?.filter(e => e.company).length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
            <h2 className="section-title">Experience</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {experience.filter(e => e.company).map((exp, i) => (
                <div key={i} className="card" style={{ borderLeft: "3px solid var(--primary)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{exp.role}</h3>
                      <p style={{ color: "var(--primary)", fontWeight: 500, fontSize: "0.95rem" }}>{exp.company}</p>
                    </div>
                    {exp.duration && <span style={{ color: "var(--text-muted)", fontSize: "0.875rem", background: "var(--surface-2)", padding: "0.25rem 0.75rem", borderRadius: "4px", alignSelf: "flex-start" }}>{exp.duration}</span>}
                  </div>
                  {exp.description && <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.925rem" }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates?.filter(c => c.name).length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
            <h2 className="section-title">Certificates</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {certificates.filter(c => c.name).map((cert, i) => (
                <div key={i} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{cert.name}</h3>
                    <p style={{ color: "var(--primary)", fontWeight: 500, marginTop: "0.25rem" }}>
                      {cert.issuer}{cert.date ? ` • ${cert.date}` : ""}
                    </p>
                  </div>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm"><FiExternalLink size={14} /> Verify</a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        {contact && Object.values(contact).some(v => v) && (
          <section style={{ marginBottom: "2rem", textAlign: "center" }}>
            <h2 className="section-title">Get In Touch</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              {contact.email && <a href={`mailto:${contact.email}`} className="btn btn-primary"><FiMail /> {contact.email}</a>}
              {contact.github && <a href={contact.github} target="_blank" rel="noreferrer" className="btn btn-secondary"><FiGithub /> GitHub</a>}
              {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary"><FiLinkedin /> LinkedIn</a>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const linkStyle = {
  display: "inline-flex", alignItems: "center", gap: "0.4rem",
  color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem",
  padding: "0.4rem 0.875rem", background: "rgba(255,255,255,0.05)",
  borderRadius: "999px", border: "1px solid var(--border)", transition: "all 0.2s",
};

export default PortfolioView;
