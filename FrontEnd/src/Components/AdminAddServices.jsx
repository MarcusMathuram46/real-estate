import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminAddServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", desc: "", price: 100 });

  const fetchServices = async () => {
    const res = await axios.get("/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/services", form);
    setForm({ title: "", desc: "", price: 100 });
    fetchServices();
  };

  const deleteService = async (id) => {
    await axios.delete(`/api/services/${id}`);
    fetchServices();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>

      {/* Add New Service */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Service Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Service Description"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Service</button>
      </form>

      {/* Services List */}
      <ul className="space-y-3">
        {services.map((s) => (
          <li key={s._id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <div>
              <h3 className="font-bold">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
              <span className="text-blue-600 font-semibold">₹{s.price}</span>
            </div>
            <button
              onClick={() => deleteService(s._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminAddServices;
