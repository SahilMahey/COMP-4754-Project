"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";
import { useSignUp } from "../hooks/useAuth";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpErrorMessage, setSignUpErrorMessage] = useState(null);
  const {
    mutate: signUpMutate,
    isError: isSignUpError,
    isSuccess: isSignUpSuccessful,
    error: signUpError,
  } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    if (isSignUpError && signUpError) {
      setSignUpErrorMessage(signUpError.response.data.message);
    }
  }, [isSignUpError, signUpError]);

  // Redirect to login page on successful signup
  useEffect(() => {
    if (isSignUpSuccessful) {
      router.push("/login");
    }
  }, [isSignUpSuccessful, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signUpMutate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.log("Error during signup: ", error);
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
          <p className="text-red-300">
            {signUpErrorMessage && signUpErrorMessage}
          </p>
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
