/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "../../../lib/api";
import { useAuth } from "../../../store/useAuth";
import { motion } from "framer-motion";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-10"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Log in to your account to access the dashboard
        </p>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>
          {err && <div className="text-red-600 text-sm">{err}</div>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Log In
          </button>
        </form>
        <div className="mt-5 flex justify-between text-sm text-gray-500">
          <Link
            href="/auth/register"
            className="hover:text-indigo-600 transition"
          >
            Create Account
          </Link>
          <Link
            href="/auth/forgot-password"
            className="hover:text-indigo-600 transition"
          >
            Forgot Password?
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
