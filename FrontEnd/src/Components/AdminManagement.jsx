import React, { useState, useEffect } from "react";
import axios from "./axios";

function AdminManagement() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/alluser");
      setAdmins(res.data);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        User & Role Management
      </h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, idx) => (
              <tr
                key={admin._id}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4">{admin.username}</td>
                <td className="py-3 px-4">{admin.phone || "N/A"}</td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4">{admin.role}</td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManagement;
