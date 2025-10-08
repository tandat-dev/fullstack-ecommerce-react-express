const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// Route to get all orders
router.get("/orders", orderController.selectOrder);

// Route to create a new order
router.post("/addOrders", orderController.createOrder);

// Route to edit an order
router.put("/editOrders", orderController.editOrder);

// Route to delete an order
router.delete("/deleteOrders", orderController.deleteOrder);

// Route to get order details by order ID
router.get("/orders/details/:orderId", orderController.getOrderDetails);

// Route to get order by order ID
router.get("/orders/:orderId", orderController.selectOrderByID);

module.exports = router;
