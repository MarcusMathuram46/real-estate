const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const LoginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], 
      default: "user",         
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);


// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Login || mongoose.model("Login", LoginSchema);
