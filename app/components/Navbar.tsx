"use client";
import { useAuth } from "@/store/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          Smart Task Manager
        </Link>
        <nav className="space-x-3">
          <Link href="/teams">Teams</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/tasks">Tasks</Link>
        </nav>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <div>{user.name}</div>
            <button
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
              className="px-3 py-1 border rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
}
