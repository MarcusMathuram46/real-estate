const express = require("express");
const { createService, getAllServices, updateService, deleteService } = require("../Controller/serviceController.js");

const router = express.Router();

router.post("/", createService);   // Add new service
router.get("/", getAllServices);   // Get all services
router.put("/:id", updateService); // Update service
router.delete("/:id", deleteService); // Delete service

module.exports = router;
