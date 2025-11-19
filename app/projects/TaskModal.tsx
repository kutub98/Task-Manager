/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { API } from "../../lib/api";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
  const [loading, setLoading] = useState(false);

  const create = async () => {
    if (!title.trim()) return alert("Title is required");
    setLoading(true);
    try {
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
      setTitle("");
      setDesc("");
      setPriority("Low");
      setStatus("Pending");
      setMember("");
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-transform scale-100">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          Create New Task
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Task Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            disabled={loading}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              disabled={loading}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              disabled={loading}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <select
            value={assignedMember}
            onChange={(e) => setMember(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            disabled={loading}
          >
            <option value="">Unassigned</option>
            {members.map((m: any) => (
              <option key={m.memberId} value={m.memberId}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={create}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-semibold text-white transition flex items-center justify-center ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {loading ? "Creating..." : "Create Task"}
        </button>

        <button
          onClick={() => setOpen(false)}
          className="mt-3 w-full text-center text-gray-500 hover:text-gray-700 transition underline"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
