const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  files: [
    {
      filename: String,
      path: String,
    },
  ],
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
