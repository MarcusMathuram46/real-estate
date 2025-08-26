const express = require("express");
const { registerAdmin, loginAdmin } = require("../Controller/AdminCtrl");

const router = express.Router();

// Register admin
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

module.exports = router;
