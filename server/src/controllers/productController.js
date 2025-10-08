const fs = require("fs");
const path = require("path");

const productModel = require("../models/productModel");

const ProductController = {
  selectProducts: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    productModel.selectPaginated(offset, limit, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      productModel.count((err, total) => {
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
  // Select category by ID
  selectProductByID: (id, callback) => {
    productModel.selectByID(id, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback({ message: "Category not found" }, null);
      }
      callback(null, results[0]);
    });
  },
  // Select product by slug and ID
  getProductByID: (req, res) => {
    const { id } = req.params;
    productModel.selectByID(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(results[0]);
    });
  },
  selectBySlugID: (req, res) => {
    const { id } = req.params;
    productModel.selectByID(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  selectProductLimit: (req, res) => {
    productModel.selectNew((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  createProduct: (req, res) => {
    const {
      name,
      description,
      stock,
      price,
      pricesale,
      status,
      category_name,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.filename) : [];

    const data = {
      name,
      description,
      stock,
      price,
      pricesale,
      status,
      category_name,
      images,
    };
    productModel.create(data, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        message: "Product created successfully",
        id: results.insertId,
      });
    });
  },
  editProduct: (req, res) => {
    const { id } = req.params;
    ProductController.selectProductByID(id, (err, product) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }
      const {
        name,
        description,
        stock,
        price,
        pricesale,
        status,
        category_name,
      } = req.body;
      const newImages = req.files ? req.files.map((file) => file.filename) : [];

      // Parse product.images if it's a JSON string
      let oldImages = [];
      try {
        oldImages = JSON.parse(product.images);
      } catch (e) {
        console.error("Failed to parse images:", e);
      }

      // If new images are uploaded, delete the old images
      if (newImages.length > 0 && Array.isArray(oldImages)) {
        oldImages.forEach((image) => {
          const imagePath = path.join(__dirname, "../uploads", image);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Failed to delete image: ${imagePath}`, err);
            }
          });
        });
      }

      const images = newImages.length > 0 ? newImages : oldImages;

      const data = {
        name,
        description,
        stock,
        price,
        pricesale,
        status,
        category_name,
        images,
        id,
      };

      productModel.edit(id, data, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({
          message: "Product updated successfully",
        });
      });
    });
  },
  deleteProduct: (req, res) => {
    const id = req.query.id;
    ProductController.selectProductByID(id, (err, product) => {
      if (err) {
        return res.status(404).json({ error: err.message });
      }
      // Parse product.images if it's a JSON string
      let images = [];
      try {
        images = JSON.parse(product.images);
      } catch (e) {
        console.error("Failed to parse images:", e);
      }

      // If images are found, delete them
      if (Array.isArray(images)) {
        images.forEach((image) => {
          const imagePath = path.join(__dirname, "../uploads", image);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Failed to delete image: ${imagePath}`, err);
            }
          });
        });
      }

      productModel.delete(id, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({
          message: "Product deleted successfully",
        });
      });
    });
  },
};

module.exports = ProductController;
