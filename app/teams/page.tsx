/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { API } from "../../lib/api";

// export default function TeamsPage() {
//   const [teams, setTeams] = useState<any[]>([]);
//   const [name, setName] = useState("");

//   const loadTeams = async () => {
//     try {
//       const res = await API.get("/teams");
//       console.log(res.data, "res data");
//       setTeams(res.data);
//     } catch (err: any) {
//       console.error("Failed to load teams:", err.message);
//     }
//   };

//   const createTeam = async () => {
//     if (!name.trim()) return;

//     try {
//       await API.post("/teams/create", { name });
//       setName("");
//       loadTeams();
//     } catch (err: any) {
//       console.error("Failed to create team:", err.message);
//     }
//   };

//   useEffect(() => {
//     loadTeams();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl mb-4">Teams</h1>

//       <div className="mb-4 flex gap-2">
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2"
//           placeholder="Team name"
//         />
//         <button
//           onClick={createTeam}
//           className="bg-indigo-600 text-white px-3 py-1"
//         >
//           Create a
//         </button>
//       </div>

//       <div className="space-y-3">
//         {teams.map((team) => (
//           <div
//             key={team._id}
//             className="p-3 bg-white rounded shadow flex justify-between "
//           >
//             <div className="font-bold flex flex-col">
//               <h1>{team.name}</h1>
//               <h1>Members: {team.members?.length || 0}</h1>
//             </div>
//             <div className="text-sm">
//               <button>Add Members</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { API } from "../../lib/api";
import { TeamItem } from "./TeamITem";

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [name, setName] = useState("");

  const loadTeams = async () => {
    try {
      const res = await API.get("/teams");
      setTeams(res.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const createTeam = async () => {
    if (!name.trim()) return;
    try {
      await API.post("/teams/create", { name });
      setName("");
      loadTeams();
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Teams</h1>

      <div className="mb-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Team name"
          className="border p-2"
        />
        <button
          onClick={createTeam}
          className="bg-indigo-600 text-white px-3 py-1"
        >
          Create
        </button>
      </div>

      <div className="space-y-3">
        {teams.map((team) => (
          <TeamItem key={team._id} team={team} refreshTeams={loadTeams} />
        ))}
      </div>
    </div>
  );
}
