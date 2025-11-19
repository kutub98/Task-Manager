/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { API } from "../lib/api";
import { gsap } from "gsap";

export default function Page() {
  const [summary, setSummary] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const load = async () => {
    const s = await API.get("/dashboard/summary");
    setSummary(s.data);
    const l = await API.get("/dashboard/activity");
    setLogs(l.data);
  };
  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (summary)
      gsap.from(".card", { y: 10, opacity: 0, duration: 0.4, stagger: 0.1 });
  }, [summary]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="card p-4 bg-white rounded shadow">
          Projects
          <br />
          {summary?.totalProjects}
        </div>
        <div className="card p-4 bg-white rounded shadow">
          Tasks
          <br />
          {summary?.totalTasks}
        </div>
        <div className="card p-4 bg-white rounded shadow">
          Members
          <br />
          {summary?.teamSummary?.length}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg">Team Summary</h2>
        <div className="mt-2 space-y-2">
          {summary?.teamSummary?.map((m: any, i: number) => (
            <div
              key={i}
              className={`p-3 bg-white rounded shadow flex justify-between ${
                m.overloaded ? "border-l-4 border-red-500" : ""
              }`}
            >
              {m.member}
              <div>
                {m.tasks}/{m.capacity}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg">Recent Activity</h2>
        <div className="mt-2 space-y-2">
          {logs.map((l) => (
            <div key={l._id} className="p-2 bg-white rounded shadow text-sm">
              {new Date(l.timestamp).toLocaleString()} — {l.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
