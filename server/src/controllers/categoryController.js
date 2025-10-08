const fs = require("fs");
const path = require("path");

const categoryModel = require("../models/categoryModel");

const categoryController = {
  // Select all categories
  selectCategories: (req, res) => {
    categoryModel.select((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  // Select category by ID
  selectCategoryByID: (id, callback) => {
    categoryModel.selectByID(id, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback({ message: "Category not found" }, null);
      }
      callback(null, results[0]);
    });
  },
  // Create category
  createCategory: (req, res) => {
    const { name, status } = req.body;
    const image = req.file ? req.file.filename : null;
    const data = { name, image, status };
    categoryModel.create(data, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  // Edit category
  editCategory: (req, res) => {
    const id = req.params.id;
    categoryController.selectCategoryByID(id, (err, category) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }
      const { name, status } = req.body;
      const image = req.file ? req.file.filename : category.image;
      const data = { name, image, status, id };

      // Kiểm tra nếu ảnh thay đổi thì xóa ảnh cũ
      if (req.file && category.image) {
        const oldImagePath = path.join(__dirname, "../uploads", category.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image file:", err);
          }
        });
      }
      categoryModel.edit(data, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(results);
      });
    });
  },
  // Delete category
  deleteCategory: (req, res) => {
    const id = req.query.id;
    categoryController.selectCategoryByID(id, (err, category) => {
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
    categoryModel.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
};

module.exports = categoryController;
