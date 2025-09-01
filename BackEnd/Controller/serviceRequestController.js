const ServiceRequest =require("../Model/ServiceRequest.js");

// Create new service request
const createServiceRequest = async (req, res) => {
  try {
    const { name, email, phone, service, cost, paymentId } = req.body;

    if (!name || !email || !phone || !service || !cost || !paymentId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new ServiceRequest({
      name,
      email,
      phone,
      service,
      cost,
      paymentId,
    });

    await newRequest.save();
    res.status(201).json({ message: "Request saved successfully", newRequest });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all requests (for admin)
const getAllRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// update
const updateServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request updated successfully", updatedRequest });
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a service request
const deleteServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await ServiceRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("Error deleting request:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports={ createServiceRequest, getAllRequests, updateServiceRequest, deleteServiceRequest };