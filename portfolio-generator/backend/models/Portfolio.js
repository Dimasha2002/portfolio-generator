const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  techStack: [{ type: String, trim: true }],
  githubLink: { type: String, trim: true },
  liveDemo: { type: String, trim: true },
});

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  duration: { type: String, trim: true },
  description: { type: String, trim: true },
});

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  issuer: { type: String, trim: true },
  date: { type: String, trim: true },
  link: { type: String, trim: true },
});

const portfolioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9_-]+$/, "Username can only contain letters, numbers, hyphens and underscores"],
    },
    fullName: { type: String, required: [true, "Full name is required"], trim: true },
    title: { type: String, trim: true, default: "Full Stack Developer" },
    bio: { type: String, trim: true },
    profileImage: { type: String, trim: true },
    contact: {
      email: { type: String, trim: true, lowercase: true },
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    skills: [{ type: String, trim: true }],
    projects: [projectSchema],
    experience: [experienceSchema],
    certificates: [certificateSchema],
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
