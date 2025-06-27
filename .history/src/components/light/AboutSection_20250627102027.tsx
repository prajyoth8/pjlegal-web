"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AboutSection() {
  const router = useRouter();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-f font-semibold text-amber-600 bg-amber-50 rounded-full">
            ABOUT PJ LEGAL
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Modern Legal Practice <br className="hidden md:block" />
            <span className="text-amber-600">Rooted in Excellence</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
        </motion.div>

        {/* Content Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-amber-100 transition-all duration-300 hover:shadow-sm"
          >
            <div className="text-amber-500 text-3xl mb-4">01</div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Vision</h3>
            <p className="text-gray-600">
              To redefine legal services by combining cutting-edge technology with uncompromising
              legal expertise, delivering solutions that are as innovative as they are effective.
            </p>
          </motion.div>

          {/* Approach Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-amber-100 transition-all duration-300 hover:shadow-sm"
          >
            <div className="text-amber-500 text-3xl mb-4">02</div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Unique Approach</h3>
            <p className="text-gray-600">
              With a rare blend of tech expertise (Salesforce/SAP, AI from IIT Roorkee) and legal
              education, we bring fresh perspectives to traditional legal challenges.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-amber-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">Process automation for efficiency</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-amber-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">Data-driven case strategies</span>
              </li>
            </ul>
          </motion.div>

          {/* Promise Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-amber-100 transition-all duration-300 hover:shadow-sm"
          >
            <div className="text-amber-500 text-3xl mb-4">03</div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Client Promise</h3>
            <p className="text-gray-600">
              We commit to providing personalized attention and clear communication - because every
              client deserves to feel valued and informed throughout their legal journey.
            </p>
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm text-amber-800 font-medium">
                "Building trust through transparency and results-focused representation."
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => router.push("/about")}
            className="relative inline-flex items-center px-8 py-3 overflow-hidden text-lg font-medium text-amber-600 border-2 border-amber-600 rounded-full group hover:text-white"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-amber-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="relative flex items-center">
              Know More
              <svg
                className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
