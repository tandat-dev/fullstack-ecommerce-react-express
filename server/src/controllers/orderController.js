const orderModel = require("../models/orderModel");
const orderDetailsModel = require("../models/orderDetailsModel");
const chartModel = require("../models/chartModel");
const productModel = require("../models/productModel");

const orderController = {
  selectOrder: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    orderModel.selectPaginated(offset, limit, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      orderModel.count((err, total) => {
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
  selectOrderByID: (req, res) => {
    const { orderId } = req.params;
    orderModel.selectByOrderID(orderId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  },
  editOrder: (req, res) => {
    const data = req.body;
    orderModel.edit(data, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Order updated" });
    });
  },
  deleteOrder: (req, res) => {
    const id = req.query.id;
    orderModel.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Order and associated details deleted" });
    });
  },
  createOrder: (req, res) => {
    const { fullname, phone, email, address, shipping, status, items } =
      req.body;

    const orderData = {
      fullname,
      phone,
      email,
      address,
      shipping,
      status,
    };

    orderModel.insert(orderData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create order" });
      }

      const orderId = result.insertId;
      const totalSales = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalEarning = items.reduce(
        (sum, item) => sum + item.total_price,
        0
      );

      const orderDetailsData = items.map((item) => ({
        order_id: orderId,
        product_name: item.product_name,
        quantity: item.quantity,
        price_item: item.price_item,
        total_price: item.total_price,
      }));

      // Use Promise.all to handle multiple asynchronous operations
      Promise.all(
        orderDetailsData.map(
          (detail) =>
            new Promise((resolve, reject) => {
              orderDetailsModel.insert(detail, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            })
        )
      )
        .then(() => {
          // Update stock for each product
          return Promise.all(
            items.map(
              (item) =>
                new Promise((resolve, reject) => {
                  productModel.updateStock(
                    item.product_name,
                    item.quantity,
                    (err) => {
                      if (err) {
                        return reject(err);
                      }
                      resolve();
                    }
                  );
                })
            )
          );
        })
        .then(() => {
          const currentDate = new Date();
          chartModel.findOrCreate(
            currentDate,
            totalSales,
            totalEarning,
            0,
            0,
            (err) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Failed to update chart" });
              }
              res
                .status(201)
                .json({ message: "Order created successfully", orderId });
            }
          );
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to create order details" });
        });
    });
  },
  getOrderDetails: (req, res) => {
    const { orderId } = req.params;

    Promise.all([
      new Promise((resolve, reject) => {
        orderDetailsModel.selectByOrderId(orderId, (err, results) => {
          if (err) {
            console.error("Error fetching order details:", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
      new Promise((resolve, reject) => {
        orderModel.selectById(orderId, (err, results) => {
          if (err) {
            console.error("Error fetching order info:", err);
            reject(err);
          } else {
            resolve(results[0]);
          }
        });
      }),
    ])
      .then(([orderDetails, customerInfo]) => {
        res.status(200).json({ details: orderDetails, order: customerInfo });
      })
      .catch((err) => {
        console.error("Error in getOrderDetails:", err);
        res.status(500).json({ error: "Failed to fetch order details" });
      });
  },
};

module.exports = orderController;
