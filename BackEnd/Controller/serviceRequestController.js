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

module.exports={ createServiceRequest, getAllRequests };