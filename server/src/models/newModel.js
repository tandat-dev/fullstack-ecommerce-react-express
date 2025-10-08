const db = require("../config/db");
const { create } = require("./categoryModel");

const newModel = {
  select: (callback) => {
    const sql = "SELECT * FROM news ORDER BY created DESC";
    db.query(sql, callback);
  },
  selectByID: (id, callback) => {
    const sql = "SELECT * FROM news WHERE id = ?";
    db.query(sql, [id], callback);
  },
  create: (data, callback) => {
    const { title, description, content, status, image } = data;
    const sql =
      "INSERT INTO news (title, description, content, status, image) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, description, content, status, image], callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM news WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = newModel;
