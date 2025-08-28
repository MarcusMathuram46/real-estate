import React, { useState, useEffect } from 'react';
import axios from './axios';

const roles = ['Admin', 'User']; // ✅ Only two roles

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`/admin/alluser`);
      setAdmins(res.data);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editId) {
        await axios.put(
          `/admin/update-role`,
          { id: editId, ...formData },
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
      } else {
        await axios.post(`/admin/register`, formData);
      }
      fetchAdmins();
      resetForm();
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  };

  const handleEdit = (admin) => {
    setFormData({
      username: admin.username || '',
      email: admin.email || '',
      role: admin.role || '',
    });
    setEditId(admin._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/admin/deleteUser/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        fetchAdmins();
      } catch (error) {
        console.error("Error deleting admin:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ username: '', email: '', role: '' });
    setEditId(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        User & Role Management
      </h1>

      {/* Form */}
      {(editId !== null || true) && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Name"
              required
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              {editId ? 'Update User' : 'Add User'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, idx) => (
              <tr
                key={admin._id}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4">{admin.username}</td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4">{admin.role}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(admin)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
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
