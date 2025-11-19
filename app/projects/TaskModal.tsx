/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { API } from "../../lib/api";

export default function CreateTaskModal({
  open,
  setOpen,
  projectId,
  members,
  refresh,
}: any) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [assignedMember, setMember] = useState("");

  const create = async () => {
    await API.post("/tasks/create", {
      project: projectId,
      title,
      description,
      priority,
      status,
      assignedMember: assignedMember
        ? members.find((m: any) => m.memberId === assignedMember)
        : null,
    });

    setOpen(false);
    refresh();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-3">Create Task</h2>

        <input
          placeholder="Task Title"
          className="border p-2 rounded w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded w-full mb-2"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          value={assignedMember}
          onChange={(e) => setMember(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        >
          <option value="">Unassigned</option>
          {members.map((m: any) => (
            <option key={m.memberId} value={m.memberId}>
              {m.name}
            </option>
          ))}
        </select>

        <button
          onClick={create}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          Create Task
        </button>

        <button
          className="mt-2 text-gray-600 underline w-full"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
