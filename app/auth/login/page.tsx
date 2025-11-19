/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "../../../lib/api";
import { useAuth } from "../../../store/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();
  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password: pass });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/");
    } catch (err: any) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          type="password"
          className="border p-2 w-full"
        />
        <button className="bg-indigo-600 text-white px-4 py-2">Login</button>
      </form>
      {err && <div className="text-red-600 mt-2">{err}</div>}
    </div>
  );
}
