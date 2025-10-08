const db = require("../config/db");

const AccountModel = {
  select: (callback) => {
    const sql = "SELECT * FROM account ORDER BY id ASC";
    db.query(sql, callback);
  },
  findById: (id, callback) => {
    const sql = "SELECT * FROM account WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(new Error("Account not found"), null);
      }
      callback(null, results[0]);
    });
  },
  edit: (data, callback) => {
    const { id, fullname, username, email, password, phone, role } = data;
    const sql =
      "UPDATE account SET fullname = ?, username = ?, email = ?, password = ?, phone = ?, role = ? WHERE id = ?";
    db.query(
      sql,
      [fullname, username, email, password, phone, role, id],
      callback
    );
  },
  register: (data) => {
    return new Promise((resolve, reject) => {
      const { fullname, username, email, phone, password, role } = data;
      const sql =
        "INSERT INTO account (fullname, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(
        sql,
        [fullname, username, email, phone, password, role],
        (err, result) => {
          if (err) {
            console.error("Database Error:", err);
            return reject(err);
          }
          return resolve(result);
        }
      );
    });
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      const { username } = data;
      const sql = "SELECT * FROM account WHERE username = ?";
      db.query(sql, [username], (err, result) => {
        if (err) {
          console.error("Database Error:", err);
          return reject(err);
        }
        if (result.length === 0) {
          return resolve(null);
        }
        return resolve(result[0]);
      });
    });
  },
  getInfo: (username) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM account WHERE username = ?";
      db.query(sql, [username], (err, result) => {
        if (err) {
          console.error("Database Error:", err);
          return reject(err);
        }
        if (result.length === 0) {
          return resolve(null);
        }
        return resolve(result[0]);
      });
    });
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM account WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = AccountModel;
