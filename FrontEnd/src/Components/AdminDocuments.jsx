import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function AdminDocuments() {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/documents');
      setDocuments(res.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:4000/api/documents/${id}/status`, {
        status,
      });
      fetchDocuments();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Title */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-gray-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📂 Admin Document Review
      </motion.h2>

      {/* Table */}
      <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border">User</th>
              <th className="p-3 border">Documents</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {documents.map((doc, idx) => (
                <motion.tr
                  key={doc._id}
                  className="text-center hover:bg-gray-50 transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="p-3 border font-medium text-gray-800">
                    {doc.name}
                  </td>
                  <td className="p-3 border space-y-1">
                    {doc.files.map((file, idx2) => (
                      <a
                        key={idx2}
                        href={`http://localhost:4000${file.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-600 hover:text-blue-800 underline transition"
                      >
                        {file.filename}
                      </a>
                    ))}
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        doc.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : doc.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleStatusChange(doc._id, 'Approved')}
                      className="px-4 py-1 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 mr-2"
                    >
                      ✅ Approve
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleStatusChange(doc._id, 'Rejected')}
                      className="px-4 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                    >
                      ❌ Reject
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDocuments;
