const fs = require("fs");
const path = require("path");

const newModel = require("../models/newModel");

const newController = {
  selectNew: (req, res) => {
    newModel.select((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  selectCategoryByID: (id, callback) => {
    newModel.selectByID(id, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback({ message: "News not found" }, null);
      }
      callback(null, results[0]);
    });
  },
  createNew: (req, res) => {
    const { title, description, content, status } = req.body;
    const image = req.file ? req.file.filename : null;
    const data = { title, description, content, image, status };

    newModel.create(data, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  deleteNews: (req, res) => {
    const id = req.query.id;
    newController.selectCategoryByID(id, (err, category) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }
      //   Xóa ảnh trong uploads
      if (category.image) {
        fs.unlink(
          path.join(__dirname, "../uploads/", category.image),
          (err) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
          }
        );
      }
    });
    // Xóa category trong database
    newModel.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
};

module.exports = newController;
