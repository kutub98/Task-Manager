export type Member = {
  memberId: string;
  name: string;
  role?: string;
  capacity: number;
};
export type Team = {
  _id: string;
  name: string;
  owner: string;
  members: Member[];
};
export type Project = {
  _id: string;
  name: string;
  description?: string;
  team: string;
};
export type Task = {
  _id: string;
  project: string;
  title: string;
  description?: string;
  assignedMember?: { memberId: string; name: string } | null;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Done";
};
