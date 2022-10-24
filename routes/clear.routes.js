const express = require("express");
const router = express.Router();
const clearcontroller = require("../controllers/clear.controller");

router.get("/logout", clearcontroller.logout);

module.exports = router;
