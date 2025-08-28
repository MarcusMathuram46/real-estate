import React from "react";
import { FaUsers, FaMoneyBillWave, FaClipboardList, FaCheckCircle } from "react-icons/fa";

function AdminDashboard() {
  // Mock data
  const stats = [
    { title: "Total Users", value: "245", icon: <FaUsers className="text-blue-600 text-3xl" /> },
    { title: "Total Payments", value: "₹12,50,000", icon: <FaMoneyBillWave className="text-green-600 text-3xl" /> },
    { title: "Pending Requests", value: "18", icon: <FaClipboardList className="text-yellow-600 text-3xl" /> },
    { title: "Approved Deals", value: "92", icon: <FaCheckCircle className="text-purple-600 text-3xl" /> },
  ];

  const requests = [
    { id: 1, user: "Ramesh Kumar", property: "2BHK Flat - Chennai", amount: "₹45,000", status: "Pending" },
    { id: 2, user: "Anita Sharma", property: "Villa - Coimbatore", amount: "₹1,20,000", status: "Approved" },
    { id: 3, user: "Vikram Rao", property: "Plot - Madurai", amount: "₹80,000", status: "Pending" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🏠 Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition">
            <div>{stat.icon}</div>
            <div>
              <h3 className="text-gray-600">{stat.title}</h3>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">📩 Recent Requests</h2>
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
                <tr key={req.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-3 px-4">{req.user}</td>
                  <td className="py-3 px-4">{req.property}</td>
                  <td className="py-3 px-4">{req.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        req.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
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
      </div>

      {/* Payments */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">💳 Recent Payments</h2>
        <ul className="divide-y divide-gray-200">
          <li className="flex justify-between py-3">
            <span>Ramesh Kumar - 2BHK Flat</span>
            <span className="font-semibold text-green-600">₹45,000</span>
          </li>
          <li className="flex justify-between py-3">
            <span>Anita Sharma - Villa</span>
            <span className="font-semibold text-green-600">₹1,20,000</span>
          </li>
          <li className="flex justify-between py-3">
            <span>Vikram Rao - Plot</span>
            <span className="font-semibold text-green-600">₹80,000</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
