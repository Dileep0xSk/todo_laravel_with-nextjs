"use client";

import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiFilePlus,
  FiMessageSquare,
  FiCheckCircle,
  FiXCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { createSubmission } from "@/src/lib/submissions";
import Link from "next/link";

export default function CreateSubmission() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);

    try {
      const res = await createSubmission(formData);

      if (!res.success) {
        setError(res.message || "Something went wrong");
      } else {
        setSuccess("Submission sent successfully!");
        e.target.reset();
      }
    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create Submission
          </h1>
          <p className="text-gray-500">
            Fill out the form below to send your application
          </p>
        </div>

        {/* Back button */}
        <Link
          href="/submissions"
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 transition text-white px-4 py-2.5 rounded-lg shadow-md"
        >
          <FiArrowLeft />
          Back
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-xl border border-gray-200 rounded-xl p-8">
        {/* Alerts */}
        {success && (
          <div className="flex items-center gap-2 p-4 mb-4 text-green-700 bg-green-100 border border-green-300 rounded-lg">
            <FiCheckCircle className="text-xl" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
            <FiXCircle className="text-xl" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FiUser className="text-gray-500" /> Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FiMail className="text-gray-500" /> Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Number */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FiPhone className="text-gray-500" /> Phone Number
            </label>
            <input
              type="text"
              name="number"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FiMessageSquare className="text-gray-500" /> Message
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Document */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FiFilePlus className="text-gray-500" /> Upload Document
            </label>
            <input
              type="file"
              name="document"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg shadow-md transition 
            ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
