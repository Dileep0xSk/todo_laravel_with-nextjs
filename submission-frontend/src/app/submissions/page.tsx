import Link from "next/link";
import { getAllSubmissions } from "@/src/lib/submissions";
import { FiEye, FiEdit2 } from "react-icons/fi";
import { Submission } from "@/src/types/submission";
import DeleteButton from "@/src/components/DeleteButton"; // <--- ADD THIS

export default async function SubmissionsPage() {
  const res = await getAllSubmissions();
  const submissions: Submission[] = res.data || [];

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Submissions</h1>
          <p className="text-gray-500 mt-1">Manage all user form submissions</p>
        </div>

        <Link
          href="/submissions/create"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2"
        >
          <span className="text-lg">＋</span>
          <span>Create New</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {submissions.length > 0 ? (
              submissions.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-800 font-medium">{item.id}</td>
                  <td className="p-4 text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.email}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-6">
                      {/* View */}
                      <Link
                        href={`/submissions/${item.id}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                      >
                        <FiEye className="text-lg" /> <span>View</span>
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/submissions/${item.id}/edit`}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800 transition"
                      >
                        <FiEdit2 className="text-lg" /> <span>Edit</span>
                      </Link>

                      {/* Delete */}
                      <DeleteButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-500">
                  No submissions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
