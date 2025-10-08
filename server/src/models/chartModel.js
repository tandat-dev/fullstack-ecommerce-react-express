const db = require("../config/db");

const chartModel = {
  selectByYearMonth: (yearMonth, callback) => {
    const sql = "SELECT * FROM chart WHERE month_year = ?";
    db.query(sql, [yearMonth], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  getMonthlyEarnings: (year, callback) => {
    const sql = `
      SELECT 
        months.month,
        IFNULL(SUM(CASE WHEN MONTH(chart.created) = months.month THEN chart.earning ELSE 0 END), 0) AS monthly_earning
      FROM 
        (SELECT 1 AS month UNION ALL 
         SELECT 2 UNION ALL 
         SELECT 3 UNION ALL 
         SELECT 4 UNION ALL 
         SELECT 5 UNION ALL 
         SELECT 6 UNION ALL 
         SELECT 7 UNION ALL 
         SELECT 8 UNION ALL 
         SELECT 9 UNION ALL 
         SELECT 10 UNION ALL 
         SELECT 11 UNION ALL 
         SELECT 12) AS months
      LEFT JOIN chart ON MONTH(chart.created) = months.month AND YEAR(chart.created) = ?
      GROUP BY months.month
      ORDER BY months.month
    `;
    db.query(sql, [year], (err, results) => {
      if (err) return callback(err);

      // Initialize an array with 12 zeros
      const monthlyEarnings = Array(12).fill(0);

      // Map results to the monthlyEarnings array
      results.forEach((row) => {
        const monthIndex = row.month - 1; // month is 1-based, array is 0-based
        monthlyEarnings[monthIndex] = row.monthly_earning;
      });

      callback(null, monthlyEarnings);
    });
  },
  incrementViews: (date, callback) => {
    const sqlSelect =
      "SELECT * FROM chart WHERE month_year = DATE_FORMAT(?, '%Y-%m')";
    db.query(sqlSelect, [date], (err, results) => {
      if (err) return callback(err);

      if (results.length > 0) {
        const sqlUpdate = "UPDATE chart SET views = views + 1 WHERE id = ?";
        db.query(sqlUpdate, [results[0].id], callback);
      } else {
        const sqlInsert =
          "INSERT INTO chart (views, sales, contacts, earning, created) VALUES (1, 0, 0, 0, ?)";
        db.query(sqlInsert, [date], callback);
      }
    });
  },
  incrementContacts: (date, callback) => {
    const sqlSelect =
      "SELECT * FROM chart WHERE month_year = DATE_FORMAT(?, '%Y-%m')";
    db.query(sqlSelect, [date], (err, results) => {
      if (err) return callback(err);

      if (results.length > 0) {
        const sqlUpdate =
          "UPDATE chart SET contacts = contacts + 1 WHERE id = ?";
        db.query(sqlUpdate, [results[0].id], callback);
      } else {
        const sqlInsert =
          "INSERT INTO chart (views, sales, contacts, earning, created) VALUES (0, 0, 1, 0.00, ?)";
        db.query(sqlInsert, [date], callback);
      }
    });
  },
  findOrCreate: (
    date,
    sales = 0,
    earning = 0,
    views = 0,
    contacts = 0,
    callback
  ) => {
    const sqlSelect =
      "SELECT * FROM chart WHERE month_year = DATE_FORMAT(?, '%Y-%m')";

    db.query(sqlSelect, [date], (err, results) => {
      if (err) return callback(err);

      if (results.length > 0) {
        const sqlUpdate =
          "UPDATE chart SET sales = sales + ?, earning = earning + ?, views = views + ?, contacts = contacts + ? WHERE id = ?";
        db.query(
          sqlUpdate,
          [sales, earning, views, contacts, results[0].id],
          callback
        );
      } else {
        const sqlInsertDefault =
          "INSERT INTO chart (views, sales, contacts, earning, created) VALUES (0, 0, 0, 0.00, ?)";
        db.query(sqlInsertDefault, [date], (err, result) => {
          if (err) return callback(err);

          const sqlInsert =
            "UPDATE chart SET sales = sales + ?, earning = earning + ?, views = views + ?, contacts = contacts + ? WHERE id = ?";
          db.query(
            sqlInsert,
            [sales, earning, views, contacts, result.insertId],
            callback
          );
        });
      }
    });
  },
};

module.exports = chartModel;
