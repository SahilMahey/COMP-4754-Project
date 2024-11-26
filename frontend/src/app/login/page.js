"use client";

import React, { use, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useAuth";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    mutate: login,
    isSuccess: isLoginSuccessful,
    isError: isLoginError,
    error: loginError,
  } = useLogin();
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (isLoginSuccessful) {
      localStorage.setItem("isLoggedIn", true);
      router.push("/");
    }
  }, [isLoginSuccessful]);

  useEffect(() => {
    if (isLoginError && loginError) {
      setLoginErrorMessage(loginError.response.data.message);
    }
  }, [isLoginError, loginError]);

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
          <p className="text-red-300">
            {loginErrorMessage && loginErrorMessage}
          </p>
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
            Login
          </button>
        </form>
      </div>
    </>
  );
}
