"use client";

import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogOut() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-md">
      <nav className="w-full max-w-7xl flex items-center justify-between mx-auto">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={24} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin} className="cursor-pointer">
            <FiLock size={24} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link href={"#"} className="hover:scale-95 duration-300">
              <FiUser size={24} color="#4b556" />
            </Link>

            <button onClick={handleLogOut} className="cursor-pointer hover:scale-95 duration-300">
              <FiLogOut size={24} color="#4b5563" />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
3