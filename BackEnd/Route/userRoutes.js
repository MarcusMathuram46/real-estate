const express = require("express");
const router = express.Router();

const usercontroller = require("../Controller/UserController.js");  // ✅ import whole controller
const Verifyrole = require("../Utils/VerifyRole");            // ✅ don't forget this

// Routes
// Admin.js
router.post("/register", usercontroller.register);
router.get("/alluser", usercontroller.getallrole);
router.post("/login", usercontroller.login);
router.post("/logout", usercontroller.logout);
router.post("/forgetpassword", usercontroller.forgetpassword);
router.post("/setNewPassword", usercontroller.setNewPassword);

router.put("/approve/:id", usercontroller.approveUser);
router.put("/reject/:id", usercontroller.rejectUser);
router.put("/update-role", Verifyrole.verifyToken, usercontroller.updateRole);
router.get("/me", Verifyrole.verifyToken, usercontroller.me);
router.delete("/deleteUser/:id", Verifyrole.verifyToken, usercontroller.deleteUser);

// email routes
router.get("/approveEmail/:id", usercontroller.approve);
router.get("/rejectEmail/:id", usercontroller.reject);


module.exports = router;
