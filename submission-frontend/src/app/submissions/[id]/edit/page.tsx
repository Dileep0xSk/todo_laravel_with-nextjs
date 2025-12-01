"use client";

import React, { useEffect, useState } from "react";
import { getSubmission, updateSubmission } from "@/src/lib/submissions";
import { Submission } from "@/src/types/submission";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiFilePlus,
  FiEdit2,
  FiXCircle,
  FiCheckCircle,
} from "react-icons/fi";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditSubmission({ params }: EditPageProps) {
  const router = useRouter();

  // ✅ unwrap the promise
  const resolved = React.use(params); // <--- required by Next.js
  const submissionId = Number(resolved.id);

  const [formData, setFormData] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      const res = await getSubmission(submissionId);
      setFormData(res.data as Submission);
    }

    loadData();
  }, [submissionId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    setSuccess("");
    setError("");

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("number", formData.number);
    fd.append("message", formData.message);

    const fileInput = e.currentTarget.document as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      fd.append("document", file);
    }

    const res = await updateSubmission(submissionId, fd);

    if (!res.success) {
      setError(res.message || "Something went wrong.");
    } else {
      setSuccess("Submission updated successfully!");
      setTimeout(() => {
        router.push(`/submissions/${submissionId}`);
      }, 1200);
    }

    setLoading(false);
  };

  if (!formData) {
    return <p className="text-center mt-12 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Submission</h1>
          <p className="text-gray-500">Update the details for submission</p>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 transition text-white px-4 py-2.5 rounded-lg shadow-md"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>

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

      {/* Form */}
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium flex items-center gap-2">
              <FiUser /> Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium flex items-center gap-2">
              <FiMail /> Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Number */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium flex items-center gap-2">
              <FiPhone /> Number
            </label>
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Document */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium flex items-center gap-2">
              <FiFilePlus /> Replace Document (optional)
            </label>
            <input type="file" name="document" className="block mt-1" />

            <p className="text-sm mt-2">
              Current File:{" "}
              <a
                href={formData.document_url ?? "#"}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Document
              </a>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg shadow-md transition ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <FiEdit2 />
            {loading ? "Updating..." : "Update Submission"}
          </button>
        </form>
      </div>
    </div>
  );
}
