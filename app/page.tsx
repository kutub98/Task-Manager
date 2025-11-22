/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { API } from "../lib/api";
import { motion } from "framer-motion";
import { FaProjectDiagram, FaTasks, FaUsers } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  // Load dashboard data only if user exists
  const load = async () => {
    try {
      const s = await API.get("/dashboard/summary");
      setSummary(s.data);

      const l = await API.get("/dashboard/activity");
      setLogs(l.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    }
  };

  useEffect(() => {
    if (user) {
      load();
    }
  }, [user]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  // Professional "Not Logged In" UI
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100 px-4"
      >
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
              Access Restricted
            </h1>
            <p className="text-gray-600 mb-6">
              You need to log in first to access your dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/auth/login"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Register
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Dashboard Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-xl sm:text-4xl font-bold text-gray-900">
          Dashboard
        </h1>
        <button className=" px-2 py-1 text-base sm:px-4 sm:text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          New Project
        </button>
      </header>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            title: "Projects",
            value: summary?.totalProjects,
            icon: <FaProjectDiagram size={28} />,
            color: "indigo",
          },
          {
            title: "Tasks",
            value: summary?.totalTasks,
            icon: <FaTasks size={28} />,
            color: "green",
          },
          {
            title: "Members",
            value: summary?.teamSummary?.length,
            icon: <FaUsers size={28} />,
            color: "purple",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            className={`p-6 bg-white rounded-2xl shadow-md flex items-center space-x-4 border-l-4 border-${card.color}-500 hover:shadow-xl cursor-pointer transition-shadow`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div
              className={`p-3 rounded-full bg-${card.color}-100 text-${card.color}-600`}
            >
              {card.icon}
            </div>
            <div>
              <div className="text-gray-500 text-sm">{card.title}</div>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Team Summary */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Team Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary?.teamSummary?.map((member: any, i: number) => (
            <motion.div
              key={i}
              custom={i}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className={`flex justify-between items-center p-5 bg-white rounded-2xl shadow-md border-l-4 ${
                member.overloaded ? "border-red-500" : "border-transparent"
              } hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="text-gray-800 font-medium">{member.member}</div>
              <div className="text-gray-500 font-medium">
                {member.tasks}/{member.capacity}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white rounded-2xl shadow-md divide-y divide-gray-100">
          {logs.map((log, i) => (
            <motion.div
              key={log._id}
              custom={i}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="text-gray-700">{log.message}</div>
              <div className="text-gray-400 text-sm">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
