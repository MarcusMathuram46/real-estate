const Service = require("../Model/Service.js");

// Add a new service
const createService = async (req, res) => {
  try {
    const { title, desc, price } = req.body;
    if (!title || !desc || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = new Service({ title, desc, price });
    await newService.save();
    res.status(201).json({ message: "Service created successfully", newService });
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service updated successfully", updatedService });
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createService, getAllServices, updateService, deleteService };
