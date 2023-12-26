import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Navbar() {
  return (
    <nav className="shadow-lg font-medium mb-8 p-2 bg-white">
      <div className="flex justify-between container mx-auto items-center">
        <Link href="/main">
          <div>
            <img src="/images/logo.png" alt="logo" className="h-20" />
          </div>
        </Link>
        <ul className="flex gap-x-2">
          <li className="px-3 py-1 text-2xl font-bold text-cyan-800 hover:text-black transition duration-300 ease-in-out hover:scale-105">
            <Link href="/main/userSettings">Profile</Link>
          </li>
          <li className="px-3 py-1 text-2xl font-bold text-cyan-800 hover:text-black transition duration-300 ease-in-out hover:scale-105">
            <button
              onClick={() => {
                signOut({ callbackUrl: "/login", redirect: true });
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
