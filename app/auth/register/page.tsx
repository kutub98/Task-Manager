/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api"; // base URL string
import { motion } from "framer-motion";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const submit = async (e: any) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch(`${api}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Register failed");
      }

      router.push("/auth/login");
    } catch (error: any) {
      setErr(error.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-10"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Fill in the details to register your account
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              required
            />
          </div>

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
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              required
            />
          </div>

          {err && <div className="text-red-600 text-sm">{err}</div>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
