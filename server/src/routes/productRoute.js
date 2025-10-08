const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../server");

router.get("/products", productController.selectProducts);
router.get("/products/:alias/:id", productController.getProductByID);
router.get("/productsNew", productController.selectProductLimit);
router.post(
  "/addProducts",
  upload.array("images", 10),
  productController.createProduct
);
router.put(
  "/editProducts/:id",
  upload.array("images", 10),
  productController.editProduct
);

router.delete("/deleteProducts", productController.deleteProduct);

module.exports = router;
