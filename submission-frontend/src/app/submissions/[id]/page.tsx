import Link from "next/link";
import { getSubmission } from "@/src/lib/submissions";
import {
  FiEdit2,
  FiArrowLeft,
  FiFileText,
  FiUser,
  FiMail,
  FiPhone,
} from "react-icons/fi";

export default async function ViewSubmission(props: any) {
  const params = await props.params;
  const id = Number(params.id);

  if (isNaN(id)) {
    return (
      <div className="max-w-xl mx-auto mt-16 text-red-600 text-center text-lg">
        Invalid submission ID.
      </div>
    );
  }

  const response = await getSubmission(id);
  const data = response?.data;

  if (!data) {
    return (
      <div className="max-w-xl mx-auto mt-16 text-red-600 text-center text-lg">
        Submission not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Submission #{data.id}
          </h1>
          <p className="text-gray-500 mt-1">
            Detailed information about this submission
          </p>
        </div>

        <Link
          href={`/submissions/${id}/edit`}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-lg shadow"
        >
          <FiEdit2 />
          <span>Edit</span>
        </Link>
      </div>

      {/* ===== Info Card ===== */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Name */}
        <div className="flex items-center gap-3 mb-6">
          <FiUser className="text-gray-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium text-gray-800">{data.name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 mb-6">
          <FiMail className="text-gray-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-800">{data.email}</p>
          </div>
        </div>

        {/* Number */}
        <div className="flex items-center gap-3 mb-6">
          <FiPhone className="text-gray-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-lg font-medium text-gray-800">{data.number}</p>
          </div>
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Message</p>
          <div className="bg-gray-50 p-4 rounded-lg border text-gray-700 leading-relaxed">
            {data.message}
          </div>
        </div>

        {/* Document Link */}
        <div className="mb-2 flex items-center gap-2">
          <FiFileText className="text-gray-500 text-xl" />
          <p className="text-sm text-gray-500">Attached Document</p>
        </div>

        <a
          href={data.document_url}
          target="_blank"
          className="inline-block bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg text-blue-600 font-medium underline"
        >
          View / Download Document
        </a>
      </div>

      {/* ===== Back Button ===== */}
      <div className="mt-8">
        <Link
          href="/submissions"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition shadow"
        >
          <FiArrowLeft />
          Back to Submissions
        </Link>
      </div>
    </div>
  );
}
