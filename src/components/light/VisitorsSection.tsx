"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getVisitCount, incrementVisitCount } from "@/services/metrics";
import { motion } from "framer-motion";

export default function VisitorsSection() {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      await incrementVisitCount();
      const count = await getVisitCount();
      setVisits(count);
    }
    fetchData();
  }, []);

  return (
    <section
      id="visitors"
      className="relative h-[500px] md:h-[600px] overflow-hidden z-10 bg-gradient-to-br from-amber-500 via-black to-black rounded-t-[50px] rounded-b-[0px] shadow-2xl"
    >
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        autoPlay
        muted
        loop
        playsInline
        poster="https://static-us-west-2.similarcdn.com/build/20250624.master.d52007c/dist/scripts/lite-app/assets/31f4d6108ae3a497ea9e.png"
      >
        <source
          src="https://static-us-east-1.similarcdn.com/static_assets/lite/videos/globe-2400x1200.mp4"
          media="(min-width: 888px)"
        />
        <source
          src="https://static-us-east-1.similarcdn.com/static_assets/lite/videos/globe-1440x720.mp4"
        />
      </video>

      {/* 🔤 Foreground Content */}
      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide bg-gradient-to-r from-yellow-400 via-amber-600 to-orange-500 bg-clip-text text-transparent"
        >
          👥 Total Visitors
        </motion.h2>

        <motion.p
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-5xl md:text-6xl font-bold drop-shadow-md"
        >
          <CountUp end={visits} duration={2.5} separator="," />+
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-3 text-lg md:text-xl text-gray-300"
        >
          Amazing people have explored <span className="text-white font-semibold">PJ Legal</span>!
        </motion.p>
      </div>
    </section>
  );
}
