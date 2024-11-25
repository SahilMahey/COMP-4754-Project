"use client";

import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful!");
        router.push("/login"); // Redirect to login page
      } else {
        const error = await response.json();
        alert(error.message); // Display the error message from the server
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-6 bg-black min-h-screen">
        <h1 className="text-4xl font-bold text-red-500 mb-6">Signup</h1>
        <form
          className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          <label className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white mb-4"
          />
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white mb-4"
          />
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white mb-6"
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Signup
          </button>
        </form>
      </div>
    </>
  );
}
