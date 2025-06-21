"use client";

export default function WelcomeBar() {
  return (
    <section className="w-full bg-gradient-to-r from-yellow-200/10 to-yellow-500/5 text-center py-10 px-4 rounded-xl border border-yellow-900/10 shadow-md">
      <h1 className="text-2xl md:text-4xl font-bold text-yellow-400">
        PJ Legal: Practice Smarter. Defend Stronger.
      </h1>
      <p className="mt-3 text-sm md:text-base text-gray-300 max-w-3xl mx-auto">
        We blend traditional advocacy with cutting-edge legal intelligence to deliver trusted and modern solutions for individuals and businesses.
      </p>
    </section>
  );
}
