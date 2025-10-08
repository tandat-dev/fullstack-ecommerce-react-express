const express = require("express");
const router = express.Router();
const chartController = require("../controllers/chartController");

// Get chart by year and month
router.get("/chart", chartController.getChartByYearMonth);
// Get monthly earnings
router.get("/monthlyEarnings", chartController.getMonthlyEarnings);
// Increment views
router.post("/incrementViews", chartController.incrementViews);

module.exports = router;
