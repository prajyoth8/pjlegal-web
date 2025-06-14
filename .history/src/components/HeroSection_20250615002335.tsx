"use client";

export default function HeroSection() {
  return (
    <section className="text-white text-center pt-16 pb-12 px-4 max-w-4xl">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
        AI-Powered Legal Solutions
      </h2>
      <p className="text-lg md:text-xl mb-6">
        Harnessing the power of artificial intelligence to transform your legal
        experience.
      </p>
      <a
        href="#contact"
        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition"
      >
        Contact Us
      </a>
    </section>
  );
}
