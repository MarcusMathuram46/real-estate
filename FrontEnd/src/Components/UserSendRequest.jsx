import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, XCircle, Info } from 'lucide-react';

function UserSendRequest() {
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [services, setServices] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  // 🔹 Fetch services dynamically
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/services');
        setServices(res.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };
    fetchServices();
  }, []);

  // 🔹 Fetch uploaded docs
  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/documents');
      setDocuments(res.data);
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // 🔹 Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle file select
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // 🔹 Upload documents
  const handleUpload = async () => {
    if (!selectedFiles.length) {
      setToast({ type: 'error', message: 'Please select files first!' });
      return;
    }

    setLoading(true);
    const formDataUpload = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formDataUpload.append('documents', selectedFiles[i]);
    }
    formDataUpload.append('userId', 'USER123'); // Replace with actual userId
    formDataUpload.append('name', formData.name);

    try {
      await axios.post(
        'http://localhost:4000/api/documents/upload',
        formDataUpload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      setSelectedFiles([]);
      fetchDocuments();
      setToast({ type: 'success', message: '✅ Files uploaded successfully!' });
    } catch (err) {
      console.error('Upload failed:', err);
      setToast({ type: 'error', message: '❌ Upload failed!' });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Submit Service Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/requests', formData);
      setFormData({ service: '', name: '', email: '', phone: '', message: '' });
      setToast({ type: 'success', message: '✅ Request sent successfully!' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: '❌ Failed to send request' });
    }
  };

  // 🔹 Find selected service description
  const selectedService = services.find((s) => s.title === formData.service);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-6 max-w-4xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl"
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        Send Service Request
      </h2>

      {/* 🔹 Toast Messages */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              toast.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Dropdown */}
        <motion.select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a Service</option>
          {services.map((s) => (
            <option key={s._id} value={s.title}>
              {s.title}
            </option>
          ))}
        </motion.select>

        {/* Show service description */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2 text-gray-600 bg-blue-50 border border-blue-200 p-3 rounded-lg"
            >
              <Info className="text-blue-600 mt-1" size={18} />
              <p className="text-sm">{selectedService.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other fields */}
        <motion.input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <motion.input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <motion.input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <motion.textarea
          name="message"
          placeholder="Additional Details"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          🚀 Submit Request
        </motion.button>
      </form>

      {/* Document Upload Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <FileText className="text-blue-600" /> Upload Supporting Documents
        </h3>

        <motion.div
          className="flex items-center gap-3 bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-xl mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="flex-1 text-gray-600"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Upload size={18} />
            {loading ? 'Uploading...' : 'Upload'}
          </motion.button>
        </motion.div>

        {/* Documents Table */}
        <motion.table
          className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">File Name</th>
              <th className="p-3 text-center">Preview</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {documents.map((doc, docIndex) =>
                doc.files.map((file, fileIndex) => (
                  <motion.tr
                    key={`${doc._id || docIndex}-${file.filename}-${fileIndex}`}
                    className="border-t text-gray-700 hover:bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="p-3">{file.filename}</td>
                    <td className="p-3 text-center">
                      <a
                        href={`http://localhost:4000${file.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="p-3 text-center">
                      {doc.status === 'Approved' ? (
                        <span className="flex items-center justify-center gap-1 text-green-600 font-semibold">
                          <CheckCircle size={16} /> Approved
                        </span>
                      ) : doc.status === 'Rejected' ? (
                        <span className="flex items-center justify-center gap-1 text-red-600 font-semibold">
                          <XCircle size={16} /> Rejected
                        </span>
                      ) : (
                        <span className="text-yellow-600 font-medium">
                          Pending
                        </span>
                      )}
                    </td>
                  </motion.tr>
                )),
              )}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
}

export default UserSendRequest;
