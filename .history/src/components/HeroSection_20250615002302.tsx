'use client';

export default function HeroSection() {
  return (
    <section className="text-center py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-6">
        Next-Gen AI-Powered Legal Solutions
      </h1>
      <p className="text-lg md:text-xl text-gray-100 mb-8">
        Combining deep legal expertise with the power of AI for faster, smarter, and more reliable legal services.
      </p>
      <div className="space-x-4">
        <a href="#services" className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg shadow-md">
          Explore Services
        </a>
        <a href="#contact" className="px-6 py-3 border border-white text-white hover:bg-white hover:text-blue-700 font-medium rounded-lg">
          Contact Us
        </a>
      </div>
    </section>
  );
}
