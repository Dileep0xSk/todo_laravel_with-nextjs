"use client";

import { useState } from "react";

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
      const res = await fetch("http://127.0.0.1:8000/api/submissions", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
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
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Submit Your Application</h1>

      {success && <p className="text-green-600 mb-3">{success}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="number"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Message</label>
          <textarea
            name="message"
            rows={4}
            className="w-full border px-3 py-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Upload Document</label>
          <input
            type="file"
            name="document"
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
