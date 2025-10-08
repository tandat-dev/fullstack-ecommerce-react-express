const db = require("../config/db");

const ContactModel = {
  selectPaginated: (offset, limit, callback) => {
    const sql = "SELECT * FROM contacts ORDER BY created DESC LIMIT ?, ?";
    db.query(sql, [offset, limit], callback);
  },
  count: (callback) => {
    const sql = "SELECT COUNT(*) AS total FROM contacts";
    db.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].total);
    });
  },
  select: (callback) => {
    const sql = "SELECT * FROM contacts ORDER BY created DESC";
    db.query(sql, callback);
  },
  create: (data, callback) => {
    const { fullname, phone, title, message, status } = data;
    const sql =
      "INSERT INTO contacts (fullname, phone, title, message, status) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [fullname, phone, title, message, status], callback);
  },
  edit: (data, callback) => {
    const { fullname, phone, title, message, status, id } = data;
    const sql =
      "UPDATE contacts SET fullname = ?, phone = ?, title = ?, message = ?, status = ? WHERE id = ?";
    db.query(sql, [fullname, phone, title, message, status, id], callback);
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM contacts WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = ContactModel;
