import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trash2, Reply } from 'lucide-react';

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [replyText, setReplyText] = useState({});

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get('http://localhost:4000/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle reply input change
  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  // Send reply
  const sendReply = async (id) => {
    const reply = replyText[id];
    if (!reply) return alert("Reply cannot be empty");

    try {
      await axios.put(
        `http://localhost:4000/api/requests/${id}`,
        { adminReply: reply },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      setReplyText((prev) => ({ ...prev, [id]: '' }));
      fetchRequests();
    } catch (err) {
      console.error("Error sending reply:", err.response?.data || err.message);
    }
  };

  // Delete request
  const deleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📋 Manage User Requests
      </motion.h2>

      <div className="overflow-x-auto rounded-xl shadow-2xl bg-white/70 backdrop-blur-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Admin Reply</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {requests.map((req) => (
                <motion.tr
                  key={req._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    <span className="font-semibold">{req.name}</span>
                    <div className="text-sm text-gray-600">📧 {req.email}</div>
                  </td>
                  <td className="p-3 text-sm text-gray-700">📱 {req.phone}</td>
                  <td className="p-3 font-semibold">{req.service}</td>
                  <td className="p-3">{req.message || '—'}</td>
                  <td className="p-3">
                    <motion.span
                      className={`px-2 py-1 rounded text-white shadow-md ${
                        req.status === 'approved'
                          ? 'bg-green-500'
                          : req.status === 'rejected'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {req.status}
                    </motion.span>
                  </td>
                  <td className="p-3">{req.adminReply || '—'}</td>
                  <td className="p-3 flex flex-col sm:flex-row gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateStatus(req._id, 'approved')}
                      className="flex items-center gap-1 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-lg text-green-700 font-medium"
                    >
                      <CheckCircle size={18} /> Approve
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateStatus(req._id, 'rejected')}
                      className="flex items-center gap-1 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg text-red-700 font-medium"
                    >
                      <XCircle size={18} /> Reject
                    </motion.button>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Write reply..."
                        value={replyText[req._id] || ''}
                        onChange={(e) => handleReplyChange(req._id, e.target.value)}
                        className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => sendReply(req._id)}
                        className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-lg text-blue-700 font-medium"
                      >
                        <Reply size={18} /> Send
                      </motion.button>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteRequest(req._id)}
                      className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-gray-700 font-medium"
                    >
                      <Trash2 size={18} /> Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default AdminRequests;
