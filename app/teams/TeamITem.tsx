/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { API } from "../../lib/api";

export function TeamItem({ team, refreshTeams }: {team:any, refreshTeams: any}) {
  const [memberName, setMemberName] = useState("");
  const [role, setRole] = useState("");
  const [capacity, setCapacity] = useState(0);

  const addMember = async () => {
    if (!memberName.trim() || !role.trim()) return;

    try {
      await API.put(`/teams/${team._id}/members/add`, {
        name: memberName,
        role,
        capacity,
      });
      setMemberName("");
      setRole("");
      setCapacity(0);
      refreshTeams(); // reload teams
    } catch (err: any) {
      console.error("Failed to add member:", err.message);
    }
  };

  return (
    <div className="p-3 bg-white rounded shadow flex flex-col gap-2">
      <div className="font-bold">{team.name}</div>
      <div>Members: {team.members?.length || 0}</div>

      <input
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
        placeholder="Member Name"
        className="border p-1"
      />
      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        className="border p-1"
      />
      <input
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
        placeholder="Capacity"
        className="border p-1"
      />
      <button
        onClick={addMember}
        className="bg-green-600 text-white px-3 py-1 mt-1"
      >
        Add Member
      </button>
    </div>
  );
}
