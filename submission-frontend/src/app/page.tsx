import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <Link
        href="/submissions/create"
        className="bg-blue-600 px-4 py-2 text-white rounded"
      >
        Create Submission
      </Link>
    </div>
  );
}
