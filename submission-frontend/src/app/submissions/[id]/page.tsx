import Link from "next/link";
import { getSubmission } from "@/src/lib/submissions";

export default async function ViewSubmission(props: any) {
  // FIX: params is a Promise, so we await it
  const params = await props.params;

  console.log("PARAMS:", params);

  const id = Number(params.id);
  console.log("ID:", id);

  if (isNaN(id)) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-red-600 text-center">
        Invalid ID
      </div>
    );
  }

  const response = await getSubmission(id);
  console.log("API RESPONSE:", response);

  const data = response?.data;

  if (!data) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-red-600 text-center">
        Submission Not Found
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Submission #{data.id}</h1>

      <div className="space-y-2">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Number:</strong> {data.number}</p>

        <p>
          <strong>Message:</strong>
          <br />
          <span className="block mt-1 p-2 border rounded bg-gray-50">
            {data.message}
          </span>
        </p>

        <p>
          <strong>Document:</strong>
          <br />
          <a
            href={data.document_url}
            target="_blank"
            className="text-blue-600 underline"
          >
            View / Download File
          </a>
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <Link
          href={`/submissions/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <Link
          href="/submissions"
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
