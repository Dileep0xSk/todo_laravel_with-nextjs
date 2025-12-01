import Link from "next/link";
import { getAllSubmissions } from "@/src/lib/submissions";

export default async function SubmissionsPage() {
  const res = await getAllSubmissions();
  const submissions = res.data || [];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Submissions</h1>

      <Link
        href="/submissions/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        Create New
      </Link>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((item: any) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.email}</td>

              <td className="border p-2 space-x-3">
                <Link
                  href={`/submissions/${item.id}`}
                  className="text-blue-600"
                >
                  View
                </Link>

                <Link
                  href={`/submissions/${item.id}/edit`}
                  className="text-green-600"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
