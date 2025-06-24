"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getVisitCount, incrementVisitCount } from "/src/services/metrics";

export default function VisitorsSection() {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        await incrementVisitCount(); // increment
        const updated = await getVisitCount(); // then get value
        setVisits(updated);
        console.log("✅ Visit Count Set:", updated);
      } catch (error) {
        console.error("❌ Failed to fetch visitor count:", error);
      }
    }
    fetchData();
  }, []);



  return (
    <section
  id="visitors"
  className="py-20 bg-gradient-to-r from-[#f3ec78] via-[#af4261] to-[#0f2027] text-white text-center shadow-2xl rounded-3xl mt-12"
>
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg tracking-wide animate-pulse">
      👥 Total Visitors
    </h2>

    <p className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-pink-500 to-purple-500 animate-glow">
      <CountUp end={visits} duration={2.5} separator="," />+
    </p>

    <p className="mt-2 text-lg md:text-xl text-gray-200">
      Amazing people have explored <span className="font-semibold text-white">PJ Legal</span>!
    </p>
  </div>
</section>



  );
}
