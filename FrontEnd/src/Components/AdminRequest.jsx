import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trash2, Reply } from "lucide-react";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [replyText, setReplyText] = useState({}); // ✅ store per-row replies

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/requests"); // backend should return all
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:4000/api/requests/${id}`, { status });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle reply input change (per row)
  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  // Send reply (per row)
  const sendReply = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/requests/${id}`, { adminReply: replyText[id] });
      setReplyText((prev) => ({ ...prev, [id]: "" })); // clear only that row
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete request
  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/requests/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📋 Manage User Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">File</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Admin Reply</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <AnimatePresence component="tbody">
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
                  {req.name} <br />📧 {req.email}
                </td>
                <td className="p-3 font-semibold">{req.service}</td>
                <td className="p-3">{req.message}</td>
                <td className="p-3">
                  {req.file ? (
                    <a
                      href={req.file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View File
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      req.status === "approved"
                        ? "bg-green-500"
                        : req.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="p-3">{req.adminReply || "—"}</td>
                <td className="p-3 space-x-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(req._id, "approved")}
                    className="flex items-center gap-1 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-lg text-green-700"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(req._id, "rejected")}
                    className="flex items-center gap-1 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg text-red-700"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Write reply..."
                      value={replyText[req._id] || ""}
                      onChange={(e) => handleReplyChange(req._id, e.target.value)}
                      className="border p-1 rounded"
                    />
                    <button
                      onClick={() => sendReply(req._id)}
                      className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-lg text-blue-700"
                    >
                      <Reply size={18} /> Send
                    </button>
                  </div>
                  <button
                    onClick={() => deleteRequest(req._id)}
                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-gray-700"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </table>
      </div>
    </div>
  );
}

export default AdminRequests;
