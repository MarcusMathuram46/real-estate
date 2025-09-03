import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AdminServices() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    paymentId: '',
  });

  // Fetch all service requests
  const fetchRequests = async () => {
  try {
    const token = localStorage.getItem("authToken"); // or from cookies
    const res = await fetch("http://localhost:4000/api/requests", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // ✅ send token
      },
    });

    const data = await res.json();
    console.log("Fetched data:", data);

    if (Array.isArray(data)) {
      setRequests(data);
    } else if (data.requests && Array.isArray(data.requests)) {
      setRequests(data.requests);
    } else {
      setRequests([]);
    }
    setLoading(false);
  } catch (error) {
    console.error("Error fetching requests:", error);
    setLoading(false);
  }
};


  useEffect(() => {
    fetchRequests();
  }, []);

  // Delete request
  const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this request?'))
    return;
  try {
    const token = localStorage.getItem("authToken"); // or from cookies
    const res = await fetch(`http://localhost:4000/api/requests/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      alert("Unauthorized! Please login again.");
      return;
    }

    if (res.ok) {
      setRequests(requests.filter((req) => req._id !== id));
    }
  } catch (error) {
    console.error('Delete failed:', error);
  }
};


  // Edit request
  const handleEdit = (req) => {
    setEditing(req._id);
    setFormData({ ...req });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/requests/${editing}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchRequests();
        setEditing(null);
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.h2
        className="text-4xl font-extrabold text-blue-700 text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Service Requests (Admin)
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No requests found.</p>
      ) : (
        <motion.div
          className="overflow-x-auto bg-white shadow-xl rounded-2xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <table className="min-w-full text-left">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {requests.map((req, index) => (
                  <motion.tr
                    key={req._id}
                    className="border-b hover:bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-3 px-4">{req.name}</td>
                    <td className="py-3 px-4">{req.email}</td>
                    <td className="py-3 px-4">{req.phone}</td>
                    <td className="py-3 px-4">{req.service}</td>
                    <td className="py-3 px-4">{req.paymentId}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(req)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Edit Request
              </h3>
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Email"
                  required
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Phone"
                  required
                />
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Service"
                  required
                />
                <input
                  type="text"
                  value={formData.paymentId}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentId: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Payment ID"
                  required
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminServices;
