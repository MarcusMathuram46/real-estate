import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, Eye } from 'lucide-react';

function UserMyRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/requests/my', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (Array.isArray(res.data)) {
        // sort by latest first
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRequests(sorted);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Polling for near real-time updates
  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 3000); // poll every 3s
    return () => clearInterval(interval);
  }, []);

  // ✅ Delete request
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error('Error deleting request:', err);
    }
  };

  // ✅ Update message
  const handleUpdate = async (id) => {
    const newMessage = prompt('Enter new message:');
    if (!newMessage) return;
    try {
      const res = await axios.put(
        `http://localhost:4000/api/requests/${id}`,
        { message: newMessage },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? res.data.updatedRequest || res.data : req
        )
      );
    } catch (err) {
      console.error('Error updating request:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        You have no service requests yet.
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        📄 My Service Requests
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="p-4">Service</th>
              <th className="p-4">Message</th>
              <th className="p-4">Status</th>
              <th className="p-4">Admin Reply</th>
              <th className="p-4">File</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <AnimatePresence>
            <tbody>
              {requests.map((req) => (
                <motion.tr
                  key={req._id}
                  className="border-b hover:bg-gray-50 transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <td className="p-4 font-medium text-gray-700">{req.service}</td>
                  <td className="p-4 text-gray-600">{req.message}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === 'approved'
                          ? 'bg-green-100 text-green-600'
                          : req.status === 'rejected'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {req.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 break-words max-w-xs">
                    {req.adminReply || 'Pending'}
                  </td>
                  <td className="p-4">
                    {req.file ? (
                      <a
                        href={req.file}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        <Eye size={18} /> View
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="p-4 flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleUpdate(req._id)}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                    >
                      <Pencil size={18} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </table>
      </div>
    </motion.div>
  );
}

export default UserMyRequest;
