const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String }, // ✅ for UserSendRequest
    cost: { type: Number }, // ✅ optional for free/manual request
    paymentId: { type: String }, // ✅ optional for paid request
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
