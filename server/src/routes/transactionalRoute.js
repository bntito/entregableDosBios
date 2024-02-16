const express = require("express");
const router = express.Router();

const {
    getTransactional
} = require("../controller/transactional");

router.get("/transactional", getTransactional);

module.exports = router;