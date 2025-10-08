const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const upload = multer({ storage: storage });
module.exports = upload;

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Account Route
const accountRoute = require("./routes/accountRoute");
app.use("/api/account", accountRoute);

// Category Route
const categoryRoute = require("./routes/categoryRoute");
app.use("/api", categoryRoute);

// Contact Route
const contactRoute = require("./routes/contactsRoute");
app.use("/api", contactRoute);

// Product Route
const productRoute = require("./routes/productRoute");
app.use("/api", productRoute);

// News Route
const newsRoute = require("./routes/newRoute");
app.use("/api", newsRoute);

// Order Route
const orderRoute = require("./routes/orderRoute");
app.use("/api", orderRoute);

// Chart Route
const chartRoute = require("./routes/chartRoute");
app.use("/api", chartRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
