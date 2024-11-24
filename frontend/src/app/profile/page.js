"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Link from "next/link";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Simulate fetching user data from the backend
    if (loggedIn) {
      setLoading(true);
      fetch("/api/user") // Replace with your actual backend endpoint
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => {
          setUserData({
            name: data.name || "John Doe", // Fallback if name is missing
            email: data.email || "johndoe@example.com", // Fallback if email is missing
          });
        })
        .catch(() => {
          // Fallback to default data if API call fails
          setUserData({
            name: "Jane Doe",
            email: "janedoe@example.com",
          });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Profile Content */}
      <div className="p-6 bg-black min-h-screen">
        {isLoggedIn ? (
          loading ? (
            <div className="text-white">
              <h1 className="text-4xl font-bold text-red-500 mb-4">Loading...</h1>
            </div>
          ) : (
            <div className="text-white">
              <h1 className="text-4xl font-bold text-red-500 mb-4">Your Profile</h1>
              <p className="text-gray-300 mb-2">Name: {userData.name}</p>
              <p className="text-gray-300 mb-2">Email: {userData.email}</p>
              <p className="text-gray-300">Member since: January 2023</p>
              <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors">
                Edit Profile
              </button>
            </div>
          )
        ) : (
          <div className="text-white">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Profile</h1>
            <p className="text-gray-300">Please login to view your profile.</p>
            <Link
              href="/login"
              className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors inline-block"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
