const express = require("express");
const router = express.Router();

const Admincontroller = require("../Controller/AdminController.js");  // ✅ import whole controller
const Verifyrole = require("../Utils/VerifyRole");            // ✅ don't forget this

// Routes
// Admin.js
router.post("/register", Admincontroller.register);
router.get("/alluser", Admincontroller.getallrole);
router.post("/login", Admincontroller.login);
router.post("/logout", Admincontroller.logout);
router.post("/forgetpassword", Admincontroller.forgetpassword);
router.post("/setNewPassword", Admincontroller.setNewPassword);

router.put("/approve/:id", Admincontroller.approveUser);
router.put("/reject/:id", Admincontroller.rejectUser);
router.put("/update-role", Verifyrole.verifyToken, Admincontroller.updateRole);
router.get("/me", Verifyrole.verifyToken, Admincontroller.me);
router.delete("/deleteUser/:id", Verifyrole.verifyToken, Admincontroller.deleteUser);

// email routes
router.get("/approveEmail/:id", Admincontroller.approve);
router.get("/rejectEmail/:id", Admincontroller.reject);


module.exports = router;
