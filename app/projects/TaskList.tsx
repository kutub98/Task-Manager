import React from "react";
import { motion } from "framer-motion";

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedMember?: { name: string };
  priority: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

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

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="mt-6 space-y-4">
      {tasks.map((task, index) => (
        <motion.div
          key={task._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
          }}
          className="p-5 bg-white rounded-xl border shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="text-xl font-semibold text-gray-800">
                {task.title}
              </div>
              <div className="text-gray-600">{task.description}</div>

              <div className="flex gap-2 mt-2 flex-wrap items-center text-sm">
                <span className="text-gray-700">
                  <strong>Assigned:</strong>{" "}
                  {task.assignedMember?.name || "Unassigned"}
                </span>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    priorityColors[task.priority] || "bg-gray-300 text-gray-800"
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
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(task)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
              >
                Edit
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(task._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow hover:bg-red-700 transition"
              >
                Delete
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
