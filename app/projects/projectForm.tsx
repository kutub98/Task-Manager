/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { API } from "../../lib/api";
import { motion } from "framer-motion";

export default function CreateProjectForm({ refresh }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState<any[]>([]);
  const [team, setTeam] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/teams").then((res) => setTeams(res.data));
  }, []);

  const submit = async () => {
    if (!name || !team) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await API.post("/projects/create", { name, description, team });

      // Reset form
      setName("");
      setDescription("");
      setTeam("");

      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border p-6 rounded-xl bg-white shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Create Project</h2>

      <motion.input
        whileFocus={{ scale: 1.02, borderColor: "#6366F1" }}
        placeholder="Project Name"
        value={name}
        onChange={(e:any) => setName(e.target.value)}
        className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <motion.textarea
        whileFocus={{ scale: 1.02, borderColor: "#6366F1" }}
        placeholder="Description"
        value={description}
        onChange={(e:any) => setDescription(e.target.value)}
        className="border p-3 rounded w-full mb-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <motion.select
        whileFocus={{ scale: 1.02, borderColor: "#6366F1" }}
        className="border p-3 rounded w-full mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={team}
        onChange={(e:any) => setTeam(e.target.value)}
      >
        <option value="">Select Team</option>
        {teams.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </motion.select>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={submit}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold ${
          loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Creating..." : "Create Project"}
      </motion.button>
    </motion.div>
  );
}
