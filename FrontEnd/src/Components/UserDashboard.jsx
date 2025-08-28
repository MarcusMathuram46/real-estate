import React from "react";
import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaMoneyBillWave } from "react-icons/fa";

function UserDashboard() {
  // Mock Stats
  const stats = [
    { title: "My Requests", value: "5", icon: <FaClipboardList className="text-blue-600 text-3xl" /> },
    { title: "Approved Deals", value: "2", icon: <FaCheckCircle className="text-green-600 text-3xl" /> },
    { title: "Pending Requests", value: "3", icon: <FaHourglassHalf className="text-yellow-600 text-3xl" /> },
    { title: "Total Payments", value: "₹1,65,000", icon: <FaMoneyBillWave className="text-purple-600 text-3xl" /> },
  ];

  // Mock Requests
  const myRequests = [
    { id: 1, property: "2BHK Flat - Chennai", amount: "₹45,000", status: "Pending" },
    { id: 2, property: "Villa - Coimbatore", amount: "₹1,20,000", status: "Approved" },
    { id: 3, property: "Plot - Madurai", amount: "₹80,000", status: "Pending" },
  ];

  // Mock Payments
  const payments = [
    { id: 1, property: "2BHK Flat - Chennai", amount: "₹45,000", date: "2025-08-01" },
    { id: 2, property: "Villa - Coimbatore", amount: "₹1,20,000", date: "2025-07-20" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">👤 User Dashboard</h1>

      {/* Stats */}
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

      {/* My Requests */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">📩 My Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-left">
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((req, idx) => (
                <tr key={req.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
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
                  <td className="py-3 px-4">
                    {req.status === "Pending" && (
                      <button className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {myRequests.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No requests yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">💳 My Payments</h2>
        <ul className="divide-y divide-gray-200">
          {payments.map((pay) => (
            <li key={pay.id} className="flex justify-between py-3">
              <span>{pay.property}</span>
              <div className="text-right">
                <p className="font-semibold text-green-600">{pay.amount}</p>
                <p className="text-gray-500 text-sm">{pay.date}</p>
              </div>
            </li>
          ))}
          {payments.length === 0 && (
            <li className="text-center py-4 text-gray-500">No payments found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
