const ContactModel = require("../models/contactModel");
const chartModel = require("../models/chartModel");

const ContactController = {
  selectContacts: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    ContactModel.selectPaginated(offset, limit, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      ContactModel.count((err, total) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({
          data: results,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        });
      });
    });
  },
  createContact: (req, res) => {
    const { fullname, phone, title, message, status } = req.body;
    const data = { fullname, phone, title, message, status };
    ContactModel.create(data, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const date = new Date();
      chartModel.incrementContacts(date, (err) => {
        if (err) {
          console.error("Failed to increment contacts", err);
        }
      });
      res.json(results);
    });
  },
  editContact: (req, res) => {
    const { fullname, phone, title, message, status, id } = req.body;
    const data = { fullname, phone, title, message, status, id };
    ContactModel.edit(data, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  deleteContact: (req, res) => {
    const id = req.query.id;
    ContactModel.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
};
module.exports = ContactController;
