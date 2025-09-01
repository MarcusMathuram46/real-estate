import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Install: npm install qrcode.react

const services = [
  {
    id: 1,
    title: 'Patta Transfer & Change',
    desc: 'Assistance with ownership records and revenue department updates.',
  },
  {
    id: 2,
    title: 'Legal Documentation',
    desc: 'Drafting and verification of sale deeds, agreements, and other legal documents.',
  },
  {
    id: 3,
    title: 'Property Disputes & Legal Issues',
    desc: 'Expert guidance and liaison with legal professionals to resolve disputes quickly.',
  },
  {
    id: 4,
    title: 'Due Diligence & Verification',
    desc: 'Comprehensive checks on property ownership, encumbrances, and title clearance.',
  },
  {
    id: 5,
    title: 'Guidance for Buyers & Sellers',
    desc: 'Advisory services to help customers make informed decisions in real estate transactions.',
  },
];

function ServiceCards() {
  const [selectedService, setSelectedService] = useState(null);
  const [step, setStep] = useState(null); // "buy" -> payment, "form" -> form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    paymentId: '',
  });

  const paymentUrl = 'upi://pay?pa=yourupi@upi&pn=YourName&am=100&cu=INR';
  // 👉 Replace with your UPI/payment gateway link

  const handleBuyNow = (service) => {
    setSelectedService(service);
    setStep('buy');
  };

  const handlePaymentDone = () => {
    setStep('form');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...formData,
      // service: selectedService.title,
      service: formData.service || selectedService.title,
      cost: 100,
    };

    try {
      const res = await fetch('http://localhost:4000/api/requests', {
        // 👈 backend API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          `✅ Your request for ${selectedService.title} has been submitted!`,
        );
        setStep(null);
        setFormData({ name: '', email: '', phone: '', paymentId: '' });
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('⚠️ Server error. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
        Our Services
      </h2> */}

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="mt-2 text-gray-600">{service.desc}</p>
            <button
              onClick={() => handleBuyNow(service)}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Popup */}
      {step && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            {/* Step 1: Payment */}
            {step === 'buy' && (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Pay ₹100 for {selectedService?.title}
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  Scan the QR code below or click payment link.
                </p>
                <div className="flex justify-center mb-4">
                  <QRCodeCanvas value={paymentUrl} size={180} />
                </div>
                {/* <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-3"
                >
                  Pay Now
                </a> */}
                <button
                  onClick={handlePaymentDone}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mb-2"
                >
                  I Have Paid
                </button>
                <button
                  onClick={() => setStep(null)}
                  className="w-full bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            )}

            {/* Step 2: Form */}
            {step === 'form' && (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Request for {selectedService?.title}
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />

                  {/* 🔽 New Dropdown for Services */}
                  <select
                    name="service"
                    value={formData.service || selectedService?.title}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="">Select a Service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name="paymentId"
                    placeholder="Payment ID"
                    value={formData.paymentId}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Submit Request
                  </button>
                </form>
                <button
                  onClick={() => setStep(null)}
                  className="mt-3 w-full bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceCards;
