"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function ConsultationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    preferred_date: "",
    preferred_time: "",
    purpose: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferred_date: formData.date,
        preferred_time: formData.time,
        purpose: "", // (optional field for now)
        calendly_event_id: null, // (optional field for future)
      }),
    });

    if (res.ok) {
      toast.success("✅ Appointment booked! You'll hear from us within 24 hours.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        preferred_date: "",
        preferred_time: "",
        purpose: "",
      });
      onClose();
    } else {
      toast.error("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative bg-white w-full max-w-lg p-6 rounded-xl z-50 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Schedule Free Consultation</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="full_name"
              placeholder="Your Name"
              required
              value={formData.full_name}
              onChange={handleChange}
              className="input"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="input"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input w-full"
          />
          <div className="flex gap-2">
            <input
              type="date"
              name="preferred_date"
              required
              value={formData.preferred_date}
              onChange={handleChange}
              className="input"
            />
            <input
              type="time"
              name="preferred_time"
              required
              value={formData.preferred_time}
              onChange={handleChange}
              className="input"
            />
          </div>
          <textarea
            name="purpose"
            placeholder="What is this consultation about?"
            rows={3}
            value={formData.purpose}
            onChange={handleChange}
            className="input w-full resize-none"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-xl"
          >
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
