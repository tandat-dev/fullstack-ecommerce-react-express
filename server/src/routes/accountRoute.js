const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/all", accountController.selectAccount);
router.put("/update", accountController.updateAccount);
router.post("/register", accountController.register);
router.post("/login", accountController.login);
router.get("/verify/", accountController.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.account });
});
router.get(
  "/info/:username",
  accountController.verifyToken,
  accountController.getInfo
);
router.delete("/delete", accountController.deleteAccount);

module.exports = router;
