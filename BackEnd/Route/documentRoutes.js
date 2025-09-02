const express = require('express');
const multer = require('multer');
const {
  uploadDocuments,
  getDocuments,
  updateStatus,
} = require("../Controller/documentController.js");

const router = express.Router();

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.array("documents", 10), uploadDocuments);
router.get("/", getDocuments);
router.put("/:id/status", updateStatus);

module.exports = router;
