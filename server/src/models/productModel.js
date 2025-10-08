const db = require("../config/db");
const slugify = require("slugify");
const { edit } = require("./accountModel");

const ProductModel = {
  select: (callback) => {
    const sql = "SELECT * FROM products";
    db.query(sql, callback);
  },
  selectByID: (id, callback) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.query(sql, [id], callback);
  },
  selectNew: (callback) => {
    const sql = "SELECT * FROM products ORDER BY created DESC LIMIT 6";
    db.query(sql, callback);
  },
  create: (data, callback) => {
    const {
      name,
      description,
      stock,
      price,
      pricesale,
      images,
      category_name,
      status,
    } = data;
    const slug = slugify(name, { lower: true, strict: true, locale: "vi" });
    const sql =
      "INSERT INTO products (name, slug, description, stock, price, pricesale, images, category_name, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        name,
        slug,
        description,
        stock,
        price,
        pricesale,
        JSON.stringify(images),
        category_name,
        status,
      ],
      callback
    );
  },
  edit: (id, data, callback) => {
    const {
      name,
      description,
      stock,
      price,
      pricesale,
      images,
      category_name,
      status,
    } = data;
    const slug = slugify(name, { lower: true, strict: true, locale: "vi" });
    const sql =
      "UPDATE products SET name = ?, slug = ?, description = ?, stock = ?, price = ?, pricesale = ?, images = ?, category_name = ?, status = ? WHERE id = ?";
    db.query(
      sql,
      [
        name,
        slug,
        description,
        stock,
        price,
        pricesale,
        JSON.stringify(images),
        category_name,
        status,
        id,
      ],
      callback
    );
  },
  updateStock: (productName, quantity, callback) => {
    const sql = "UPDATE products SET stock = stock - ? WHERE name = ?";
    db.query(sql, [quantity, productName], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  delete: (id, callback) => {
    const sql = "DELETE FROM products WHERE id = ?";
    db.query(sql, [id], callback);
  },
  selectPaginated: (offset, limit, callback) => {
    const sql = "SELECT * FROM products LIMIT ?, ?";
    db.query(sql, [offset, limit], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  count: (callback) => {
    const sql = "SELECT COUNT(*) AS total FROM products";
    db.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].total);
    });
  },
};

module.exports = ProductModel;
