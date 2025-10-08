const chartModel = require("../models/chartModel");

const chartController = {
  getChartByYearMonth: (req, res) => {
    const yearMonth = req.query.yearMonth;

    chartModel.selectByYearMonth(yearMonth, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch chart data" });
      }
      res.status(200).json(results);
    });
  },
  getMonthlyEarnings: (req, res) => {
    const year = req.query.year; // Get the year from the query parameter

    chartModel.getMonthlyEarnings(year, (err, monthlyEarnings) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to fetch monthly earnings" });
      }
      res.status(200).json({ monthlyEarnings });
    });
  },
  incrementViews: (req, res) => {
    const date = new Date();
    chartModel.incrementViews(date, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to increment views" });
      }
      res.status(200).json({ message: "Views incremented successfully" });
    });
  },
  incrementContacts: (req, res) => {
    const date = new Date();
    chartModel.incrementContacts(date, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to increment contacts" });
      }
      res.status(200).json({ message: "Contacts incremented successfully" });
    });
  },
};

module.exports = chartController;
