const db = require("../config/db");

const CategoryModel = {
  select: (callback) => {
    const sql = "SELECT * FROM categories";
    db.query(sql, callback);
  },
  selectByID: (id, callback) => {
    const sql = "SELECT * FROM categories WHERE id = ?";
    db.query(sql, [id], callback);
  },
  create: (data, callback) => {
    const { name, image, status } = data;
    const sql = "INSERT INTO categories (name, image, status) VALUES (?, ?, ?)";
    db.query(sql, [name, image, status], callback);
  },
  edit: (data, callback) => {
    const { name, image, status, id } = data;
    const sql =
      "UPDATE categories SET name = ?, image = ?, status = ? WHERE id = ?";
    db.query(sql, [name, image, status, id], callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    db.query(sql, [id], callback);
  },
};
module.exports = CategoryModel;
