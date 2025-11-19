/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TaskList({ tasks }: any) {
  return (
    <div className="mt-6 space-y-3">
      {tasks.map((t: any) => (
        <div key={t._id} className="p-4 bg-white shadow rounded border">
          <div className="font-bold text-lg">{t.title}</div>
          <div className="text-gray-600">{t.description}</div>

          <div className="mt-2 text-sm">
            <strong>Assigned:</strong> {t.assignedMember?.name || "Unassigned"}
          </div>

          <div className="flex gap-4 mt-1 text-sm">
            <div>Priority: {t.priority}</div>
            <div>Status: {t.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
