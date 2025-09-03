import React, { useEffect, useState } from "react";
import { FaUsers, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch users + requests
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      // fetch all users
      const usersRes = await axios.get("http://localhost:4000/api/admin/alluser", { headers });
      const allUsers = usersRes.data || [];

      // fetch all requests
      const reqRes = await axios.get("http://localhost:4000/api/requests", { headers });
      const allRequests = Array.isArray(reqRes.data) ? reqRes.data : [];

      // sort requests (latest first)
      const sortedReqs = allRequests.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setRequests(sortedReqs);

      // build stats dynamically
      setStats([
        {
          title: "Total Users",
          value: allUsers.length,
          icon: <FaUsers className="text-blue-600 text-3xl" />,
        },
        {
          title: "Pending Requests",
          value: sortedReqs.filter((r) => r.status === "Pending").length,
          icon: <FaClipboardList className="text-yellow-600 text-3xl" />,
        },
        {
          title: "Approved Deals",
          value: sortedReqs.filter((r) => r.status === "Approved").length,
          icon: <FaCheckCircle className="text-green-600 text-3xl" />,
        },
      ]);
    } catch (err) {
      console.error("Error fetching admin dashboard data:", err);
      setStats([]);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Polling every 5s
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🏠 Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition"
          >
            <div>{stat.icon}</div>
            <div>
              <h3 className="text-gray-600">{stat.title}</h3>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">📩 Recent Requests</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-white text-left">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr
                    key={req._id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-4">{req.userId?.name || "N/A"}</td>
                    <td className="py-3 px-4">{req.propertyId?.name || "N/A"}</td>
                    <td className="py-3 px-4">₹{req.amount || "N/A"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          req.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition">
                        Approve
                      </button>
                      <button className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
