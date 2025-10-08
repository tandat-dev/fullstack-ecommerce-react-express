const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "adminfastfood",
});

db.connect((err) => {
  if (err) {
    console.log("Connection failed:");
    return;
  } else {
    console.log("Connection success");
  }
});

module.exports = db;
