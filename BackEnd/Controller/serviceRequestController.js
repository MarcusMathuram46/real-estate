const ServiceRequest = require("../Model/ServiceRequest.js");

// Create new service request
const createServiceRequest = async (req, res) => {
  try {
    const { name, email, phone, service, message, cost, paymentId } = req.body;

    // basic validation
    if (!name || !email || !phone || !service) {
      return res.status(400).json({ message: "Name, Email, Phone & Service are required" });
    }

    // Paid request (ServiceCards) → require cost & paymentId
    if (cost && !paymentId) {
      return res.status(400).json({ message: "PaymentId is required for paid requests" });
    }

    const newRequest = new ServiceRequest({
      userId: req.userid || null,
      name,
      email,
      phone,
      service,
      message,
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
// Create public service request
const createService = async (req, res) => {
  try {
    const { name, email, phone, service, message, cost, paymentId } = req.body;

    // basic validation
    if (!name || !email || !phone || !service) {
      return res.status(400).json({ message: "Name, Email, Phone & Service are required" });
    }

    // Paid request (ServiceCards) → require cost & paymentId
    if (cost && !paymentId) {
      return res.status(400).json({ message: "PaymentId is required for paid requests" });
    }

    const newRequest = new ServiceRequest({
      userId: req.userid || null,
      name,
      email,
      phone,
      service,
      message,
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

// Update request
const updateServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request updated successfully", updatedRequest });
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete request
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
// Get requests of logged-in user
const getMyRequests = async (req, res) => {
  try {
    if (!req.userid) {
      return res.status(400).json({ message: "User ID not found" });
    }

    // Fetch user requests either by userId or email
    const myRequests = await ServiceRequest.find({
      $or: [
        { userId: req.userid },
        { email: req.userEmail } // attach email in token or send in request
      ]
    }).sort({ createdAt: -1 });

    res.json(myRequests);
  } catch (err) {
    console.error("Error fetching user requests:", err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  createServiceRequest,
  createService,
  getAllRequests,
  updateServiceRequest,
  deleteServiceRequest,
  getMyRequests,
};
