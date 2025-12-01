"use client";

import { deleteSubmission } from "@/src/lib/submissions";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

interface DeleteButtonProps {
  id: number;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this submission?"
    );

    if (!confirmed) return;

    setLoading(true);

    const res = await deleteSubmission(id);

    if (res.success) {
      router.refresh(); // reload page data after deleting
    } else {
      alert(res.message || "Failed to delete submission");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-red-600 hover:text-red-800 transition disabled:opacity-60"
    >
      <FiTrash2 className="text-lg" />
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
