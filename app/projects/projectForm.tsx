/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { API } from "../../lib/api";

export default function CreateProjectForm({ refresh }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState<any[]>([]);
  const [team, setTeam] = useState("");

  useEffect(() => {
    API.get("/teams").then((res) => setTeams(res.data));
  }, []);

  const submit = async () => {
    if (!name || !team) return alert("Fill required fields");

    await API.post("/projects/create", { name, description, team });

    setName("");
    setDescription("");
    setTeam("");

    refresh();
  };

  return (
    <div className="border p-4 rounded bg-gray-50">
      <h2 className="text-xl font-bold mb-3">Create Project</h2>

      <input
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <select
        className="border p-2 rounded w-full mb-3"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      >
        <option value="">Select Team</option>
        {teams.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      <button
        onClick={submit}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Create Project
      </button>
    </div>
  );
}
