// ✅ src/components/light/WelcomeSection.tsx
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="w-full py-20 bg-white text-black text-center">
      <div className="max-w-5xl mx-auto px-6">
        <Image
          src="/assets/pj_avatar.png"
          alt="Advocate PJ"
          width={120}
          height={120}
          className="mx-auto rounded-full border border-gray-300 shadow-md"
        />
        <h1 className="text-3xl md:text-4xl font-bold mt-4">
          PJ <span className="text-blue-400">Legal</span>
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Blending legal wisdom. <br />
          Empowering <span className="text-purple-400">
            Justice
          </span> <br /> With{" "}
          <span className="text-yellow-400">Intelligence</span> &{" "}
          <span className="text-yellow-400">Integrity.</span>
        </p>
      </div>
    </section>
  );
}
