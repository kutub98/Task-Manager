/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { API } from "../../lib/api";
import Link from "next/link";
import CreateProjectForm from "./projectForm";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  const loadProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      <CreateProjectForm refresh={loadProjects} />

      <div className="mt-6 space-y-3">
        {projects.map((p) => (
          <Link
            href={`/projects/${p._id}`}
            key={p._id}
            className="block p-4 bg-white shadow rounded border"
          >
            <div className="text-xl font-semibold">{p.name}</div>
            <div className="text-gray-500">{p.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
