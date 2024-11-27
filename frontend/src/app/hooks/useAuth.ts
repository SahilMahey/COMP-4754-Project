"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "../axios-instance";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface LoginData extends Omit<SignUpData, "name"> {}

interface User {
  id: string;
  name?: string; // Optional since login might not return it
  email: string;
}

export function useSignUp() {
  return useMutation<User, Error, SignUpData>({
    mutationFn: async (data) => await axios.post("/users/signup", data),
    onSuccess: (data) => {
      console.log("User signed up:", data);
      // Store signup user data in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", data.email); // Save email for future use
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
}

export function useLogin() {
  return useMutation<User, Error, LoginData>({
    mutationFn: async (data) => {
      const response = await axios.post("/users/login", data);
      return response.data; // Ensure backend returns the user object
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // Store login user data in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", data.email); // Save email for future use
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}
