/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "../../../lib/api";
import { motion } from "framer-motion";
import CreateTaskModal from "../TaskModal";
import { Button } from "@/components/ui/button";

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedMember?: { name: string };
  priority: string;
  status: string;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const projectId = id as string;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadProject = async () => {
    if (!projectId) return;

    try {
      setLoading(true);

      const p = await API.get(`/projects/${projectId}`);
      setProject(p.data);

      const t = await API.get(`/tasks/${projectId}`);
      setTasks(t.data);

      const team = await API.get(`/teams/${p.data.team._id}`);
      setTeamMembers(team.data.members);
    } catch (err) {
      console.error("Failed to load project data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) loadProject();
  }, [projectId, mounted]);

  const handleEdit = async (task: Task) => {
    if (!task._id) return;
    try {
      const updatedStatus = task.status === "Pending" ? "In Progress" : "Done";
      const { data } = await API.put(`/tasks/updated/${task._id}`, {
        status: updatedStatus,
      });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? data : t)));
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!taskId) return;
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/delete/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  if (!mounted) return null;

  const priorityColors: Record<string, string> = {
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-400 text-black",
    Low: "bg-green-500 text-white",
  };

  const statusColors: Record<string, string> = {
    Completed: "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Pending: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="p-2 space-y-6 max-w-7xl mx-auto">
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-5/6"></div>
        </div>
      ) : (
        <>
          {/* Project Header */}
          <div className="flex justify-between p-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-900">
                {project.name}
              </h1>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </motion.div>

            {/* Add Task Button */}
            <Button
              onClick={() => setOpen(true)}
              className="bg-green-600 text-white px-2 py-0 rounded-lg shadow hover:bg-green-700 transition font-semibold"
            >
              + Add Task
            </Button>
          </div>

          {/* Tasks Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 15px 25px rgba(0,0,0,0.15)",
                }}
                className="p-5 bg-white rounded-xl border shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {task.description}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3 items-center text-sm">
                  <span className="text-gray-700">
                    <strong>Assigned:</strong>{" "}
                    {task.assignedMember?.name || "Unassigned"}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      priorityColors[task.priority] ||
                      "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[task.status] || "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(task)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(task._id)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg font-medium shadow hover:bg-red-700 transition"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <CreateTaskModal
            open={open}
            setOpen={setOpen}
            projectId={projectId}
            members={teamMembers}
            refresh={loadProject}
          />
        </>
      )}
    </div>
  );
}
