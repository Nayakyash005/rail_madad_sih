import React from "react";

export default function Body() {
  return (
    <section className="ag-canvas bg-blue-200 p-6 h-screen">
      {/* New White Section */}
      <div className="bg-white p-8 mt-9 rounded-lg shadow-md w-full h-80">

        {/* Header Section */}
        <header className="mb-4">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Welcome to Rail Madad
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Discover amazing content and explore our features.
          </p>
        </header>

        {/* Main Content Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed text-center">
            We are a team of passionate developers and designers committed to building the best user experiences. Our goal is to create a seamless and engaging platform for our users.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="mt-8 text-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </div>
        
      </div>
    </section>
  );
}
