export const validatePortfolioForm = (formData) => {
  const errors = {};

  if (!formData.username) {
    errors.username = "Username is required";
  } else if (!/^[a-z0-9_-]+$/.test(formData.username)) {
    errors.username = "Username can only contain lowercase letters, numbers, hyphens, and underscores";
  } else if (formData.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!formData.fullName || formData.fullName.trim() === "") {
    errors.fullName = "Full name is required";
  }

  if (formData.contact?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

export const isValidUrl = (url) => {
  if (!url) return true; // optional
  try { new URL(url); return true; } catch { return false; }
};
