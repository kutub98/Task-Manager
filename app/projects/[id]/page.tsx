/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { api, API } from "../../../lib/api";
import TaskList from "../TaskList";
import CreateTaskModal from "../TaskModal";
import { useParams } from "next/navigation";

export default function ProjectDetails() {
  const { id } = useParams(); // ✅ FIXED
  const projectId = id as string; // cast for TS
  console.log(projectId, "projectId");

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const loadProject = async () => {
    if (!projectId) return; // wait for params

    const token = localStorage.getItem("token");
    // Load project
    const data = await fetch(`${api}/projects/${projectId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    console.log(res, "res");
    const p = await API.get(`/projects/${projectId}`);

    setProject(p.data);

    // Load team associated with project
    const team = await API.get(`/teams/${p.data.team}`);
    setTeamMembers(team.data.members);

    // Load tasks under project
    const t = await API.get(`/tasks/project/${projectId}`);
    setTasks(t.data);
  };

  useEffect(() => {
    loadProject();
  }, [projectId]); // load when id becomes available

  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p className="text-gray-600">{project.description}</p>

      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Task
      </button>

      <TaskList tasks={tasks} />

      <CreateTaskModal
        open={open}
        setOpen={setOpen}
        projectId={projectId}
        members={teamMembers}
        refresh={loadProject}
      />
    </div>
  );
}
