const express = require("express");
const { login, createUser, createAdmin } = require("../Controller/loginCtrl");
const Verifyrole = require("../Verifyrole");
const router = express.Router();

// Public
router.post("/login", login);
router.post("/register", createUser);

// Only admins can create new admins
router.post(
  "/register-admin",
  Verifyrole.verifyToken,
  Verifyrole.checkRole(["admin"]),
  createAdmin
);

module.exports = router;
