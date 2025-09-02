const Document = require("../Model/Document.js");

// Upload documents
const uploadDocuments = async (req, res) => {
  try {
    const { userId, name } = req.body;

    const files = req.files.map((file) => ({
      filename: file.originalname,
      path: `/uploads/${file.filename}`,
    }));

    const doc = new Document({ userId, name, files });
    await doc.save();

    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all documents
const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update document status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const doc = await Document.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadDocuments,
  getDocuments,
  updateStatus,
};