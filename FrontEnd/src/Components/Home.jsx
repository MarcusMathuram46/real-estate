import React from 'react';
import ServiceCards from './ServiceCards';
import { CheckCircle, Users, Shield, Clock } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#0f172a] text-white text-center py-24 px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Good Land Consultancy
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
          Trusted experts in real estate legal services & property
          documentation.
        </p>
        <button className="mt-8 bg-[#2563eb] text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-[#1d4ed8] transition">
          Get Started
        </button>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Services */}
        <section>
          <h2 className="text-3xl font-bold text-[#2563eb] mb-8 text-center">
            Our Services
          </h2>
          <ServiceCards />
        </section>

        {/* About Us */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[#2563eb] mb-4">
              About Us
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              At <span className="font-semibold">Good Land Consultancy</span>,
              we specialize in solving property-related challenges for
              landowners, buyers, and investors. From documentation to dispute
              resolution, our expertise ensures smooth, transparent, and
              reliable processes.
            </p>
            <p className="leading-relaxed text-gray-700">
              Whether it’s patta transfer, due diligence, or safeguarding your
              investments, our mission is to protect your property rights and
              provide peace of mind.
            </p>
          </div>
          <img
            src="https://i.postimg.cc/9Mh1h3gq/real.avif"
            alt="Good Land Consultancy Office"
            className="rounded-xl shadow-lg"
          />
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-3xl font-semibold text-[#2563eb] mb-8 text-center">
            Why Choose Us?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <CheckCircle className="mx-auto text-[#2563eb] mb-3" size={36} />
              <h3 className="font-semibold text-lg">Legal Expertise</h3>
              <p className="text-gray-600 mt-2">
                Deep knowledge of property laws & compliance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <Shield className="mx-auto text-[#7c3aed] mb-3" size={36} />
              <h3 className="font-semibold text-lg">Secure & Transparent</h3>
              <p className="text-gray-600 mt-2">
                100% trustworthy documentation & processes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <Users className="mx-auto text-[#2563eb] mb-3" size={36} />
              <h3 className="font-semibold text-lg">Client-Centered</h3>
              <p className="text-gray-600 mt-2">
                Dedicated support with a focus on you.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <Clock className="mx-auto text-[#7c3aed] mb-3" size={36} />
              <h3 className="font-semibold text-lg">Fast Solutions</h3>
              <p className="text-gray-600 mt-2">
                Quick, efficient handling of property issues.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-semibold text-[#2563eb] mb-8 text-center">
            Client Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-600 italic">
                “Good Land Consultancy handled my patta transfer effortlessly.
                Very professional service.”
              </p>
              <h4 className="mt-4 font-semibold text-gray-800">— Rajesh K.</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-600 italic">
                “They resolved my long-pending property dispute with complete
                transparency.”
              </p>
              <h4 className="mt-4 font-semibold text-gray-800">— Anitha P.</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-600 italic">
                “Excellent due diligence support while buying my land. Highly
                recommend them.”
              </p>
              <h4 className="mt-4 font-semibold text-gray-800">— Manoj S.</h4>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-center py-12 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold">Ready to Secure Your Property?</h2>
          <p className="mt-3 text-lg">
            Contact us today for reliable & hassle-free real estate services.
          </p>
          <button className="mt-6 bg-white text-[#2563eb] font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition">
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
}

export default Home;
