"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useAuth";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const {
    mutate: login,
    isSuccess: isLoginSuccessful,
    isError: isLoginError,
    error: loginError,
    data: loginData,
  } = useLogin();
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Redirect to the homepage on successful login
  useEffect(() => {
    if (isLoginSuccessful && loginData) {
      const { email, id, name } = loginData;
      if (email && id) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", name); // Save name
        router.push("/"); // Redirect to homepage
      }
    }
  }, [isLoginSuccessful, loginData, router]);

  useEffect(() => {
    if (isLoginError && loginError) {
      const errorMessage =
        loginError.response?.data?.message || "Login failed. Please try again.";
      setLoginErrorMessage(errorMessage);
    }
  }, [isLoginError, loginError]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: formData.email, password: formData.password });
  };

  return (
    <>
      <NavBar />
      <div className="p-6 bg-black min-h-screen">
        <h1 className="text-4xl font-bold text-red-500 mb-6">Login</h1>
        <form
          className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          {loginErrorMessage && (
            <p className="text-red-300 mb-4">{loginErrorMessage}</p>
          )}

          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white mb-4"
            required
          />

          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white mb-6"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-red-500 hover:text-red-400 underline"
          >
            Signup
          </a>
        </p>
      </div>
    </>
  );
}
