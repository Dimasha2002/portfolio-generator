import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiUser, FiMail, FiBriefcase, FiCode, FiCheckCircle } from "react-icons/fi";
import { portfolioAPI } from "../../utils/api";
import { validatePortfolioForm } from "../../utils/validation";
import toast from "react-hot-toast";

const EMPTY_PROJECT = { name: "", description: "", techStack: [], githubLink: "", liveDemo: "" };
const EMPTY_EXPERIENCE = { company: "", role: "", duration: "", description: "" };
const EMPTY_CERT = { name: "", issuer: "", date: "", link: "" };

const INITIAL_DATA = {
  username: "", fullName: "", title: "", bio: "", profileImage: "",
  contact: { email: "", linkedin: "", github: "", website: "" },
  skills: [], projects: [{ ...EMPTY_PROJECT }], experience: [{ ...EMPTY_EXPERIENCE }],
  certificates: [],
};

const Section = ({ icon: Icon, title, children }) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ width: 36, height: 36, background: "rgba(99,102,241,0.15)", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon color="var(--primary)" size={18} />
      </div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{title}</h3>
    </div>
    {children}
  </div>
);

const FormInput = ({ label, error, ...props }) => (
  <div className="form-group">
    {label && <label className="form-label">{label}</label>}
    <input className="form-input" {...props} />
    {error && <p className="form-error">{error}</p>}
  </div>
);

const PortfolioForm = ({ onSubmit, initialData = null, submitLabel = "Preview Portfolio" }) => {
  const [formData, setFormData] = useState(initialData || INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(null); // null | "checking" | "available" | "taken"
  const [loading, setLoading] = useState(false);

  // Check username availability
  useEffect(() => {
    if (!formData.username || initialData?.username === formData.username) return;
    const timer = setTimeout(async () => {
      if (formData.username.length < 3) return;
      setUsernameStatus("checking");
      try {
        const res = await portfolioAPI.checkUsername(formData.username);
        setUsernameStatus(res.data.available ? "available" : "taken");
      } catch { setUsernameStatus(null); }
    }, 600);
    return () => clearTimeout(timer);
  }, [formData.username]);

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const updateContact = (field, value) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));

  // Skills
  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !formData.skills.includes(s)) {
      update("skills", [...formData.skills, s]);
      setSkillInput("");
    }
  };
  const removeSkill = (i) => update("skills", formData.skills.filter((_, idx) => idx !== i));

  // Projects
  const addProject = () => update("projects", [...formData.projects, { ...EMPTY_PROJECT }]);
  const removeProject = (i) => update("projects", formData.projects.filter((_, idx) => idx !== i));
  const updateProject = (i, field, value) => {
    const updated = [...formData.projects];
    updated[i] = { ...updated[i], [field]: value };
    update("projects", updated);
  };
  const updateProjectTech = (i, techStr) => {
    const updated = [...formData.projects];
    updated[i].techStack = techStr.split(",").map(t => t.trim()).filter(Boolean);
    update("projects", updated);
  };

  // Experience
  const addExperience = () => update("experience", [...formData.experience, { ...EMPTY_EXPERIENCE }]);
  const removeExperience = (i) => update("experience", formData.experience.filter((_, idx) => idx !== i));
  const updateExperience = (i, field, value) => {
    const updated = [...formData.experience];
    updated[i] = { ...updated[i], [field]: value };
    update("experience", updated);
  };

  // Certificates
  const addCertificate = () => update("certificates", [...(formData.certificates || []), { ...EMPTY_CERT }]);
  const removeCertificate = (i) => update("certificates", (formData.certificates || []).filter((_, idx) => idx !== i));
  const updateCertificate = (i, field, value) => {
    const updated = [...(formData.certificates || [])];
    updated[i] = { ...updated[i], [field]: value };
    update("certificates", updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validatePortfolioForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors");
      return;
    }
    if (usernameStatus === "taken") {
      toast.error("Username is already taken");
      return;
    }
    setLoading(true);
    try {
      // Filter out empty projects and experience entries before sending to API
      const cleanedData = {
        ...formData,
        projects: formData.projects.filter(p => p.name.trim()),
        experience: formData.experience.filter(e => e.company.trim() && e.role.trim()),
        certificates: (formData.certificates || []).filter(c => c.name.trim())
      };
      await onSubmit(cleanedData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Info */}
      <Section icon={FiUser} title="Personal Information">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Username *</label>
            <div style={{ position: "relative" }}>
              <input
                className="form-input"
                value={formData.username}
                onChange={e => update("username", e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                placeholder="john-doe"
                disabled={!!initialData}
              />
              {usernameStatus && (
                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: "0.8rem",
                  color: usernameStatus === "available" ? "var(--success)" : usernameStatus === "taken" ? "var(--error)" : "var(--text-muted)" }}>
                  {usernameStatus === "checking" ? "Checking..." : usernameStatus === "available" ? "✓ Available" : "✗ Taken"}
                </span>
              )}
            </div>
            {errors.username && <p className="form-error">{errors.username}</p>}
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              Your portfolio URL: /portfolio/{formData.username || "username"}
            </p>
          </div>
          <FormInput label="Full Name *" value={formData.fullName} onChange={e => update("fullName", e.target.value)} placeholder="John Doe" error={errors.fullName} />
        </div>
        <FormInput label="Professional Title" value={formData.title} onChange={e => update("title", e.target.value)} placeholder="Full Stack Developer" />
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea className="form-input" value={formData.bio} onChange={e => update("bio", e.target.value)} placeholder="A brief description about yourself..." rows={4} />
        </div>
        <FormInput label="Profile Image URL" value={formData.profileImage} onChange={e => update("profileImage", e.target.value)} placeholder="https://example.com/photo.jpg" type="url" />
      </Section>

      {/* Contact */}
      <Section icon={FiMail} title="Contact Information">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <FormInput label="Email" value={formData.contact.email} onChange={e => updateContact("email", e.target.value)} placeholder="john@example.com" type="email" error={errors.email} />
          <FormInput label="LinkedIn URL" value={formData.contact.linkedin} onChange={e => updateContact("linkedin", e.target.value)} placeholder="https://linkedin.com/in/johndoe" />
          <FormInput label="GitHub URL" value={formData.contact.github} onChange={e => updateContact("github", e.target.value)} placeholder="https://github.com/johndoe" />
          <FormInput label="Personal Website" value={formData.contact.website} onChange={e => updateContact("website", e.target.value)} placeholder="https://johndoe.com" />
        </div>
      </Section>

      {/* Skills */}
      <Section icon={FiCode} title="Skills">
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
          <input
            className="form-input" value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
            placeholder="e.g. React, Node.js, MongoDB..."
            style={{ flex: 1 }}
          />
          <button type="button" className="btn btn-primary" onClick={addSkill}><FiPlus /> Add</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {formData.skills.map((skill, i) => (
            <span key={i} className="tag" style={{ cursor: "pointer" }} onClick={() => removeSkill(i)}>
              {skill} <span style={{ marginLeft: "0.35rem", opacity: 0.7 }}>×</span>
            </span>
          ))}
          {formData.skills.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No skills added yet. Type a skill and press Enter or click Add.</p>}
        </div>
      </Section>

      {/* Projects */}
      <Section icon={FiBriefcase} title="Projects">
        {formData.projects.map((project, i) => (
          <div key={i} className="card" style={{ marginBottom: "1rem", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h4 style={{ fontWeight: 600, color: "var(--primary)" }}>Project {i + 1}</h4>
              {formData.projects.length > 1 && (
                <button type="button" onClick={() => removeProject(i)} style={{ background: "none", border: "none", color: "var(--error)", cursor: "pointer" }}>
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <FormInput label="Project Name *" value={project.name} onChange={e => updateProject(i, "name", e.target.value)} placeholder="My Awesome Project" />
              <FormInput label="Tech Stack (comma separated)" value={project.techStack.join(", ")} onChange={e => updateProjectTech(i, e.target.value)} placeholder="React, Node.js, MongoDB" />
              <FormInput label="GitHub Link" value={project.githubLink} onChange={e => updateProject(i, "githubLink", e.target.value)} placeholder="https://github.com/..." type="url" />
              <FormInput label="Live Demo" value={project.liveDemo} onChange={e => updateProject(i, "liveDemo", e.target.value)} placeholder="https://myproject.com" type="url" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" value={project.description} onChange={e => updateProject(i, "description", e.target.value)} placeholder="Describe what this project does..." rows={3} />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addProject}><FiPlus /> Add Project</button>
      </Section>

      {/* Experience */}
      <Section icon={FiBriefcase} title="Work Experience">
        {formData.experience.map((exp, i) => (
          <div key={i} className="card" style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h4 style={{ fontWeight: 600, color: "var(--primary)" }}>Experience {i + 1}</h4>
              {formData.experience.length > 1 && (
                <button type="button" onClick={() => removeExperience(i)} style={{ background: "none", border: "none", color: "var(--error)", cursor: "pointer" }}>
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <FormInput label="Company *" value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} placeholder="Google" />
              <FormInput label="Role *" value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} placeholder="Software Engineer" />
              <FormInput label="Duration" value={exp.duration} onChange={e => updateExperience(i, "duration", e.target.value)} placeholder="Jan 2022 – Present" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" value={exp.description} onChange={e => updateExperience(i, "description", e.target.value)} placeholder="What did you do there?" rows={3} />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addExperience}><FiPlus /> Add Experience</button>
      </Section>

      {/* Certificates */}
      <Section icon={FiCheckCircle} title="Certificates">
        {(formData.certificates || []).map((cert, i) => (
          <div key={i} className="card" style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h4 style={{ fontWeight: 600, color: "var(--primary)" }}>Certificate {i + 1}</h4>
              {(formData.certificates || []).length > 1 && (
                <button type="button" onClick={() => removeCertificate(i)} style={{ background: "none", border: "none", color: "var(--error)", cursor: "pointer" }}>
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <FormInput label="Certificate Name *" value={cert.name} onChange={e => updateCertificate(i, "name", e.target.value)} placeholder="e.g. AWS Certified Developer" />
              <FormInput label="Issuer" value={cert.issuer} onChange={e => updateCertificate(i, "issuer", e.target.value)} placeholder="Issuing Organization" />
              <FormInput label="Date" value={cert.date} onChange={e => updateCertificate(i, "date", e.target.value)} placeholder="e.g. Jun 2024" />
              <FormInput label="Verification / Link" value={cert.link} onChange={e => updateCertificate(i, "link", e.target.value)} placeholder="https://..." type="url" />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addCertificate}><FiPlus /> Add Certificate</button>
      </Section>

      {/* Submit */}
      <div style={{ textAlign: "center", paddingTop: "1rem" }}>
        <button type="submit" className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2.5rem" }} disabled={loading}>
          {loading ? "Saving..." : <><FiCheckCircle /> {submitLabel}</>}
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;
