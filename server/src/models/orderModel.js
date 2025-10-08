const db = require("../config/db");

const orderModel = {
  selectPaginated: (offset, limit, callback) => {
    const sql = "SELECT * FROM orders ORDER BY id DESC LIMIT ?, ?";
    db.query(sql, [offset, limit], callback);
  },
  count: (callback) => {
    const sql = "SELECT COUNT(*) AS total FROM orders";
    db.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].total);
    });
  },
  select: (callback) => {
    const sql = "SELECT * FROM orders ORDER BY id DESC";
    db.query(sql, callback);
  },
  selectByOrderID: (orderId, callback) => {
    const sql = "SELECT * FROM orders WHERE id = ?";
    db.query(sql, [orderId], callback);
  },
  selectById: (orderId, callback) => {
    const sql = "SELECT * FROM orders WHERE id = ?";
    db.query(sql, [orderId], callback);
  },
  insert: (data, callback) => {
    const sql = "INSERT INTO orders SET ?";
    db.query(sql, data, callback);
  },
  edit: (data, callback) => {
    const sql = "UPDATE orders SET ? WHERE id = ?";
    db.query(sql, [data, data.id], callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM orders WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = orderModel;
