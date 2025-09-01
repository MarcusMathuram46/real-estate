const  express = require("express");
const { createServiceRequest, getAllRequests, updateServiceRequest,deleteServiceRequest } = require("../Controller/serviceRequestController.js");

const router = express.Router();

// POST → Save new request
router.post("/", createServiceRequest);

// GET → Fetch all requests (for admin dashboard)
router.get("/", getAllRequests);

// Update
router.put("/:id", updateServiceRequest);

// Delete
router.delete("/:id", deleteServiceRequest);

module.exports= router;
