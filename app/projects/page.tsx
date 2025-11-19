/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { API } from "../../lib/api";
import Link from "next/link";
import { FolderIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CreateProjectForm from "./projectForm";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
        >
          <PlusIcon className="h-5 w-5" />
          Create Project
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <FolderIcon className="mx-auto h-12 w-12 mb-4" />
          <p className="text-lg">
            No projects found. Create your first project!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link
              href={`/projects/${p._id}`}
              key={p._id}
              className="group block p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  {p.name}
                </h2>
                <FolderIcon className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition" />
              </div>
              <p className="text-gray-500 line-clamp-3">
                {p.description || "No description provided."}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <CreateProjectForm
              refresh={() => {
                loadProjects();
                setModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
