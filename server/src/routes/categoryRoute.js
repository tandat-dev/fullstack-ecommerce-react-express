const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../server");

// Get all categories
router.get("/categories", categoryController.selectCategories);

// Add category
router.post(
  "/addCategory",
  upload.single("image"),
  categoryController.createCategory
);

// Edit category
router.put(
  "/editCategory/:id",
  upload.single("image"),
  categoryController.editCategory
);

// Delete category
router.delete("/deleteCategory", categoryController.deleteCategory);

module.exports = router;
