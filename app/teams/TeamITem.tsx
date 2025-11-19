/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { API } from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export function TeamItem({
  team,
  refreshTeams,
}: {
  team: any;
  refreshTeams: any;
}) {
  const [memberName, setMemberName] = useState("");
  const [role, setRole] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [loading, setLoading] = useState(false);

  const addMember = async () => {
    if (!memberName.trim() || !role.trim()) return;

    try {
      setLoading(true);
      await API.put(`/teams/${team._id}/members/add`, {
        name: memberName,
        role,
        capacity,
      });
      setMemberName("");
      setRole("");
      setCapacity(0);
      refreshTeams();
    } catch (err: any) {
      console.error("Failed to add member:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
      <div>
        <h3 className="font-bold text-lg">{team.name}</h3>
        <p className="text-gray-500 text-sm">
          Members: {team.members?.length || 0}
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Member</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <Input
              placeholder="Member Name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            />
            <Input
              type="number"
              placeholder="Capacity"
              min={0}
              max={5}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button onClick={addMember} disabled={loading}>
              {loading ? "Adding..." : "Add Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
