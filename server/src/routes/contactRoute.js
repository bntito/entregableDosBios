const express = require("express");
const router = express.Router();

const {
    addContact,
    getContacts,
    getContact,
    getContactEmail,
    updateContact,
    deleteContact
} = require("../controller/contact");

router.post("/contact", addContact);
router.get("/contact", getContacts);
router.get("/contact/:id", getContact);
router.get("/contactemail/:email", getContactEmail);
router.put("/contact/:id", updateContact);
router.delete("/contact/:id", deleteContact);

module.exports = router;