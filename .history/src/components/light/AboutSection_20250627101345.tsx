"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AboutSection() {
  const router = useRouter();

  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-b from-white to-gray-50 text-black"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Innovative Legal Solutions
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bridging technology and legal expertise for modern client needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Approach</h3>
            <p className="text-gray-600 mb-4">
              PJ Legal combines traditional legal wisdom with innovative problem-solving techniques. 
              We focus on clear communication, strategic thinking, and efficient processes to deliver 
              exceptional results.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span className="text-gray-700">Tech-integrated legal services</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span className="text-gray-700">Client-centered solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span className="text-gray-700">Multidisciplinary expertise</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Founder</h3>
            <p className="text-gray-600 mb-4">
              <span className="font-medium text-gray-800">R. Prajyoth Kumar</span> brings a unique 
              perspective to legal practice with backgrounds in IT (Salesforce/SAP), AI from IIT Roorkee, 
              and legal education.
            </p>
            <p className="text-gray-600 mb-6">
              This rare combination enables PJ Legal to offer innovative approaches to traditional 
              legal challenges, particularly in tech-related matters.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push("/about")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-300 shadow-sm"
          >
            Explore Our Full Story
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}