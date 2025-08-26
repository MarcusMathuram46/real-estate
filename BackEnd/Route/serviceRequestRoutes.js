const  express = require("express");
const { createServiceRequest, getAllRequests } = require("../Controller/serviceRequestController.js");

const router = express.Router();

// POST → Save new request
router.post("/", createServiceRequest);

// GET → Fetch all requests (for admin dashboard)
router.get("/", getAllRequests);
module.exports= router;
