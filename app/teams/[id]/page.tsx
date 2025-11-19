/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { API } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamDetail({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState<any>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [capacity, setCapacity] = useState(3);
  const router = useRouter();

  const loadTeam = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/teams/${params.id}`);
      setTeam(data);
    } catch (err: any) {
      console.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const openAddModal = () => {
    setEditMember(null);
    setName("");
    setRole("");
    setCapacity(3);
    setModalOpen(true);
  };

  const openEditModal = (member: any) => {
    setEditMember(member);
    setName(member.name);
    setRole(member.role);
    setCapacity(member.capacity);
    setModalOpen(true);
  };

  const saveMember = async () => {
    if (!name.trim() || !role.trim()) return;

    if (editMember) {
      // Edit member
      await API.put(`/teams/${params.id}/members/edit/${editMember.memberId}`, {
        name,
        role,
        capacity,
      });
    } else {
      // Add new member
      await API.put(`/teams/${params.id}/members/add`, {
        name,
        role,
        capacity,
      });
    }

    setModalOpen(false);
    loadTeam();
  };

  const deleteMember = async (mid: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    await API.delete(`/teams/${params.id}/members/delete/${mid}`);
    loadTeam();
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{team?.name}</h1>

      <button
        onClick={openAddModal}
        className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Add Member
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team?.members?.map((m: any) => (
          <div
            key={m.memberId}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-semibold text-lg">{m.name}</div>
              <div className="text-gray-500">{m.role}</div>
              <div className="text-gray-400 text-sm">
                Capacity: {m.capacity}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(m)}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMember(m.memberId)}
                className="px-3 py-1 border rounded hover:bg-red-100 transition text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded shadow-lg w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">
                {editMember ? "Edit Member" : "Add Member"}
              </h2>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border p-2 rounded w-full mb-2"
              />
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
                className="border p-2 rounded w-full mb-2"
              />
              <input
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                type="number"
                min={0}
                max={5}
                className="border p-2 rounded w-full mb-4"
              />

              <div className="flex justify-between">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveMember}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  {editMember ? "Save" : "Add"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
