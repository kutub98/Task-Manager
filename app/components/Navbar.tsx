/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useAuth } from "@/store/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: "Teams", href: "/teams" },
    { name: "Projects", href: "/projects" },
    { name: "Tasks", href: "/tasks" },
  ];

  return (
    <>
      <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        {/* Logo */}
        <div ref={logoRef} className="text-2xl font-bold text-blue-600">
          <Link href="/">
            <Image src="/logo.png" alt="alt" width={50} height={50} />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User Actions / Mobile Hamburger */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="font-medium">{user.name}</span>
              <button
                onClick={() => {
                  logout();
                  router.push("/auth/login");
                }}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6 space-y-6"
            >
              {/* Close Button */}
              <button
                className="self-end p-2 rounded hover:bg-gray-100 transition"
                onClick={() => setSidebarOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Links */}
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-700 font-medium hover:text-blue-600 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* User Section */}
              <div className="mt-auto flex flex-col space-y-3">
                {user ? (
                  <>
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        router.push("/auth/login");
                        setSidebarOpen(false);
                      }}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setSidebarOpen(false)}
                      className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setSidebarOpen(false)}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
