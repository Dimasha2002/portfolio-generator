const Portfolio = require("../models/Portfolio");

// @desc  Create a new portfolio
// @route POST /api/portfolio
const createPortfolio = async (req, res, next) => {
  try {
    const existing = await Portfolio.findOne({ username: req.body.username });
    if (existing) {
      res.statusCode = 400;
      throw new Error("Username already taken. Please choose another.");
    }

    const portfolio = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// @desc  Get portfolio by username
// @route GET /api/portfolio/:username
const getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      username: req.params.username.toLowerCase(),
    });

    if (!portfolio) {
      res.statusCode = 404;
      throw new Error("Portfolio not found");
    }

    // Increment views
    portfolio.views += 1;
    await portfolio.save();

    res.json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// @desc  Update portfolio by username
// @route PUT /api/portfolio/:username
const updatePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { username: req.params.username.toLowerCase() },
      req.body,
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      res.statusCode = 404;
      throw new Error("Portfolio not found");
    }

    res.json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete portfolio by username
// @route DELETE /api/portfolio/:username
const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({
      username: req.params.username.toLowerCase(),
    });

    if (!portfolio) {
      res.statusCode = 404;
      throw new Error("Portfolio not found");
    }

    res.json({ success: true, message: "Portfolio deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc  Check if username is available
// @route GET /api/portfolio/check/:username
const checkUsername = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      username: req.params.username.toLowerCase(),
    });
    res.json({ success: true, available: !portfolio });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all portfolios (paginated)
// @route GET /api/portfolio
const getAllPortfolios = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const portfolios = await Portfolio.find({ isPublished: true })
      .select("username fullName title profileImage skills views")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Portfolio.countDocuments({ isPublished: true });

    res.json({
      success: true,
      data: portfolios,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  checkUsername,
  getAllPortfolios,
};
