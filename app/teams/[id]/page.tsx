/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { API } from "../../../lib/api";
import { useRouter } from "next/navigation";

export default function TeamDetail({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<any>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [capacity, setCapacity] = useState(3);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { data } = await API.get(`/teams/${params.id}`);
      setTeam(data);
    })();
  }, []);
  const addMember = async () => {
    await API.put(`/teams/${params.id}/members/add`, { name, role, capacity });
    setName("");
    setRole("");
    setCapacity(3);
    const { data } = await API.get(`/teams/${params.id}`);
    setTeam(data);
  };
  const delMember = async (mid: string) => {
    await API.delete(`/teams/${params.id}/members/delete/${mid}`);
    const { data } = await API.get(`/teams/${params.id}`);
    setTeam(data);
  };
  return (
    <div>
      <h1 className="text-2xl mb-4">{team?.name}</h1>
      <div className="mb-4 p-3 bg-white rounded shadow">
        <h3 className="font-semibold">Add Member</h3>
        <div className="flex gap-2 mt-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            className="border p-2"
          />
          <input
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            type="number"
            min={0}
            max={5}
            className="border p-2 w-20"
          />
          <button
            onClick={addMember}
            className="bg-indigo-600 text-white px-3 py-1"
          >
            Add
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {team?.members?.map((m: any) => (
          <div
            key={m.memberId}
            className="p-2 bg-white rounded shadow flex justify-between"
          >
            <div>
              {m.name} — {m.role}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  router.push(`/teams/${params.id}?edit=${m.memberId}`)
                }
                className="px-2 py-1 border"
              >
                Edit
              </button>
              <button
                onClick={() => delMember(m.memberId)}
                className="px-2 py-1 border"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
