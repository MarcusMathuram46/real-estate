import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";

function UserDocuments() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("documents", selectedFiles[i]);
    }
    formData.append("userId", "USER123"); // Replace with actual userId
    formData.append("name", "John Doe");

    try {
      await axios.post("http://localhost:4000/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelectedFiles([]);
      fetchDocuments();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    const res = await axios.get("http://localhost:4000/api/documents");
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FileText className="text-blue-600" /> Upload Your Documents
      </h2>

      {/* Upload Box */}
      <motion.div
        className="flex items-center gap-3 bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-xl mb-4"
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="flex-1 text-gray-600"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Upload size={18} />
          {loading ? "Uploading..." : "Upload"}
        </motion.button>
      </motion.div>

      {/* Table */}
      <motion.table
        className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">File Name</th>
            <th className="p-3 text-center">Preview</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {documents.map((doc) =>
              doc.files.map((file, index) => (
                <motion.tr
                  key={index}
                  className="border-t text-gray-700 hover:bg-gray-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-3">{file.filename}</td>
                  <td className="p-3 text-center">
                    <a
                      href={`http://localhost:4000${file.path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="p-3 text-center">
                    {doc.status === "Approved" ? (
                      <span className="flex items-center justify-center gap-1 text-green-600 font-semibold">
                        <CheckCircle size={16} /> Approved
                      </span>
                    ) : doc.status === "Rejected" ? (
                      <span className="flex items-center justify-center gap-1 text-red-600 font-semibold">
                        <XCircle size={16} /> Rejected
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </motion.table>
    </motion.div>
  );
}

export default UserDocuments;
