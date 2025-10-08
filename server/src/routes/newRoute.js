const express = require("express");
const router = express.Router();
const newController = require("../controllers/newController");
const upload = require("../server");

// Get all news
router.get("/news", newController.selectNew);
router.post("/addNews", upload.single("image"), newController.createNew);
router.delete("/deleteNews", newController.deleteNews);
module.exports = router;
