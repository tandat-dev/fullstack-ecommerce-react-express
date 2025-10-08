const db = require("../config/db");

const orderDetailsModel = {
  selectByOrderId: (orderId, callback) => {
    const sql = "SELECT * FROM order_details WHERE order_id = ?";
    db.query(sql, [orderId], callback);
  },
  insert: (data, callback) => {
    const sql = "INSERT INTO order_details SET ?";
    db.query(sql, data, callback);
  },
};

module.exports = orderDetailsModel;
