/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useData = create((set: any) => ({
  teams: [],
  projects: [],
  tasks: [],
  setTeams: (t: any) => set({ teams: t }),
  setProjects: (p: any) => set({ projects: p }),
  setTasks: (t: any) => set({ tasks: t }),
}));
