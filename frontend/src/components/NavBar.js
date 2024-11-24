"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check login status from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    // Clear login state
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to home page
  };

  return (
    <nav className="bg-black p-4 border-b-2 border-red-500">
      <div className="container mx-auto flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="text-gray-300 text-lg hover:text-red-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-gray-300 text-lg hover:text-red-500 transition-colors"
          >
            Search
          </Link>
          {isLoggedIn && (
            <>
              <Link
                href="/recommendation"
                className="text-gray-300 text-lg hover:text-red-500 transition-colors"
              >
                Recommendation
              </Link>
              <Link
                href="/records"
                className="text-gray-300 text-lg hover:text-red-500 transition-colors"
              >
                Records
              </Link>
              <Link
                href="/profile"
                className="text-gray-300 text-lg hover:text-red-500 transition-colors"
              >
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Login/Signup or Logout */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
