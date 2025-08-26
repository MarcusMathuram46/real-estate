const mongoose =require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    cost: { type: Number, required: true },
    paymentId: { type: String, required: true }, // ✅ Payment ID
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
