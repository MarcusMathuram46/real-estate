const express = require("express");
const {
  createServiceRequest,
  createService,
  getAllRequests,
  updateServiceRequest,
  deleteServiceRequest,
  getMyRequests,
} = require("../Controller/serviceRequestController.js");

const { verifyToken } = require("../Utils/VerifyRole.js"); // ✅ import your auth

const router = express.Router();

// POST → Save new request (public / user can create)
router.post("/", verifyToken, createServiceRequest);
router.post("/service", createService); // Add new service

// GET → Fetch all requests (for admin)
router.get("/", verifyToken, getAllRequests);

// GET → Fetch requests of logged-in user
router.get("/my", verifyToken, getMyRequests); // ✅ attach verifyToken

// Update (protected if needed)
router.put("/:id", verifyToken, updateServiceRequest);

// Delete (protected if needed)
router.delete("/:id", verifyToken, deleteServiceRequest);

module.exports = router;
