// ✅ Step 1: Modal UI Component with Form + Email + Supabase
"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Calendar, Mail, Phone, User, X } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ConsultationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Save to Supabase
    const { error } = await supabase.from("consultations").insert([formData]);
    if (error) {
      toast.error("Failed to book consultation.");
      setLoading(false);
      return;
    }

    // 2. Send emails
    const res = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Appointment booked! Confirmation email sent.");
      setFormData({ name: "", email: "", phone: "", date: "", time: "" });
      onClose();
    } else {
      toast.error("Email failed. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative bg-white w-full max-w-lg p-6 rounded-xl z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Schedule Free Consultation</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className="input" />
            <input type="tel" name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} className="input" />
          </div>
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="input w-full" />
          <div className="flex gap-2">
            <input type="date" name="date" required value={formData.date} onChange={handleChange} className="input" />
            <input type="time" name="time" required value={formData.time} onChange={handleChange} className="input" />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-xl">
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>

        <style jsx>{`
          .input {
            padding: 0.75rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.75rem;
            width: 100%;
            outline: none;
            font-size: 0.95rem;
          }
        `}</style>
      </div>
    </Dialog>
  );
} 
