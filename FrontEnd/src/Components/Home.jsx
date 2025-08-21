import React from "react";
import ServiceCards from "./ServiceCards";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Good Land Consultancy</h1>
        <p className="mt-3 text-lg">
          Your trusted partner for real estate legal and documentation services
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* About Us */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">About Us</h2>
          <p className="leading-relaxed text-gray-700">
            Good Land Consultancy is your trusted partner for all real estate legal and
            documentation services. We specialize in resolving property-related issues
            and providing end-to-end support for landowners, buyers, and investors.
            With our expertise, we ensure a smooth, transparent, and hassle-free
            experience for all your real estate needs.
          </p>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Services</h2>
          <ServiceCards />
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Expertise in Local Real Estate Laws</li>
            <li>Transparent Process & Documentation</li>
            <li>Trusted by Property Owners & Developers</li>
            <li>Customer-Centric Approach</li>
          </ul>
        </section>

        {/* Closing */}
        <section className="bg-blue-50 p-6 rounded-lg shadow-md">
          <p className="text-lg leading-relaxed text-gray-700">
            At <span className="font-semibold text-blue-700">Good Land Consultancy</span>,
            we believe in building trust by offering reliable, efficient, and
            professional services that protect your property rights and give you
            peace of mind.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;
