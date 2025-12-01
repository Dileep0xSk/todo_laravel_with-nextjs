"use client";

import { useEffect, useState } from "react";
import { getSubmission, updateSubmission } from "@/src/lib/submissions";
import { useRouter } from "next/navigation";

export default function EditSubmission(props: any) {
  const router = useRouter();

  const [id, setId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fix: params is a Promise, so we must resolve it inside useEffect
  useEffect(() => {
    async function resolveParams() {
      const resolved = await props.params; // ← important
      const parsedId = Number(resolved.id);
      setId(parsedId);

      const res = await getSubmission(parsedId);
      setFormData(res.data);
    }

    resolveParams();
  }, [props.params]);

  // update form fields
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("number", formData.number);
    fd.append("message", formData.message);

    // Add new file only if provided
    if (e.target.document.files[0]) {
      fd.append("document", e.target.document.files[0]);
    }

    const res = await updateSubmission(id!, fd);

    if (res.success) {
      alert("Submission updated successfully!");
      router.push(`/submissions/${id}`);
    }

    setLoading(false);
  };

  if (id === null || !formData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Edit Submission</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Number</label>
          <input
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="border p-2 w-full rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Replace Document (optional)
          </label>
          <input type="file" name="document" className="mt-1" />
        </div>

        <p className="text-sm">
          Current File:{" "}
          <a
            href={formData.document_url}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Current Document
          </a>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          {loading ? "Updating..." : "Update Submission"}
        </button>
      </form>
    </div>
  );
}
