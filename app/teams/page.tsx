/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { API } from "../../lib/api";

import { PlusIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamItem } from "./TeamITem";

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const loadTeams = async () => {
    setLoading(true);
    try {
      const res = await API.get("/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async () => {
    if (!name.trim()) return;
    setCreating(true);
    try {
      await API.post("/teams/create", { name });
      setName("");
      loadTeams();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Teams
        </h1>

        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Team name"
            disabled={creating}
            className="flex-1"
          />
          <Button
            onClick={createTeam}
            disabled={creating}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            {creating ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>

      {/* Teams List */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading teams...</div>
      ) : teams.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No teams found. Create a new team to get started.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {teams.map((team) => (
              <motion.div
                key={team._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TeamItem team={team} refreshTeams={loadTeams} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
