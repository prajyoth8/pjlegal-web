// ✅ src/components/light/WelcomeSection.tsx
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="relative w-full h-[520px] overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero_office_pjlegal.png" // 🖼️ Replace with your uploaded path
          alt="PJ Legal Sign"
          fill
          priority
          className="object-cover brightness-95 scale-110"
        />
        {/* Slight Golden Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-white/80 via-white/40 to-yellow-50/60" />
      </div>

      {/* Foreground Text Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-6xl mx-auto px-6 md:px-10">
        <h1 className="text-4xl md:text-5xl font-bold text-black drop-shadow-md">
          PJ <span className="text-blue-500">Legal</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-800 max-w-xl leading-relaxed drop-shadow-sm">
          Blending legal wisdom. Empowering{" "}
          <span className="text-purple-600 font-semibold">Justice</span> with{" "}
          <span className="text-blue-600 font-semibold">Intelligence</span> &{" "}
          <span className="text-indigo-600 font-semibold">Integrity</span>.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition">
            Book Consultation
          </button>
          <button className="px-6 py-2 border border-gray-400 text-gray-800 hover:bg-gray-100 font-medium rounded-md transition">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
