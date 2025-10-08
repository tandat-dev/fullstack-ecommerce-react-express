const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contactController");

// Get all contacts
router.get("/contacts", ContactController.selectContacts);
// Create new contact
router.post("/addContacts", ContactController.createContact);
// Edit contact
router.put("/editContacts", ContactController.editContact);
// Delete contact
router.delete("/deleteContacts", ContactController.deleteContact);

module.exports = router;
