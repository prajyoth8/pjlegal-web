"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AboutSection() {
  const router = useRouter();

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white to-gray-100 text-black rounded-t-3xl"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* 👤 Left: Your Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <Image
            src="/assets/lawyer_profile_black.png" // ← Replace with your actual uploaded image
            alt="Founder of PJ Legal"
            width={400}
            height={500}
            className="rounded-2xl shadow-xl object-cover"
          />
        </motion.div>

        {/* 📜 Right: About Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-extrabold mb-4 text-amber-600">About PJ Legal</h2>
          <p className="text-lg leading-relaxed mb-6 text-gray-800">
            PJ Legal is the brainchild of a passionate professional{" "}
            <span className="text-blue-700 font-bold">R. Prajyoth Kumar</span>, who transitioned
            from a successful IT career into the world of law. Founded by an ex-Salesforce Developer
            and SAP Security Architect with an Executive PG in Artificial Intelligence from IIT
            Roorkee, the firm is driven by a mission to simplify justice through tech-integrated
            legal practice.
          </p>

          <p className="text-md leading-relaxed text-gray-700">
            With a background in Engineering (IT), MBA in HR & Information Systems, and now LLB, I
            bring a unique multidisciplinary approach to legal problem-solving. PJ Legal is a space
            where tradition meets innovation—offering clear, client-focused, and intelligent legal
            solutions.
          </p>

          <button
            onClick={() => router.push("/about")}
            className="mt-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
          >
            Know More →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
