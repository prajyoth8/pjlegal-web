// components/TestimonialSlider.tsx
"use client";

const testimonials = [
  {
    name: "Ravi Kumar",
    quote: "Drafted my petition in 3 mins. Brilliant tool!",
  },
  {
    name: "Sana Fatima",
    quote: "Accurate, fast and legally sound. Highly recommended.",
  },
  {
    name: "Akash Mehra",
    quote: "My police complaint was ready in a click. Thank you PJ Legal!",
  },
];

export default function TestimonialSlider() {
  return (
    <div className="mt-20 max-w-4xl mx-auto px-4 space-y-6">
      <h2 className="text-xl font-bold text-center">💬 What Our Clients Say</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition"
          >
            <p className="text-sm text-gray-300 italic">“{t.quote}”</p>
            <p className="text-sm mt-2 text-right text-yellow-400 font-semibold">
              — {t.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
