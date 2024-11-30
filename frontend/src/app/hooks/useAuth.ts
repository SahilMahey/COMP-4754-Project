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

interface UpdateUserData {
  email: string;
  name: string;
}

export function useSignUp() {
  return useMutation<User, Error, SignUpData>({
    mutationFn: async (data) => {
      const response = await axios.post("/users/signup", data);
      return response.data.data; // Extract user object
    },
    onSuccess: (data) => {
      console.log("User signed up:", data);
      // Store signup user data in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", data.email); // Save email
      localStorage.setItem("userName", data.name || ""); // Save name
      localStorage.setItem("userId", data.id);
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
      return response.data.data; // Extract user object
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // Store login user data in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userName", data.name || ""); // Save name
      localStorage.setItem("userId", data.id);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

export function useUpdateUserName() {
    return useMutation<User, Error, UpdateUserData>({
      mutationFn: async ({ email, name }) => {
        const response = await axios.put("/users/update-name", { email, name });
        return response.data.data; // Extract updated user object
      },
      onSuccess: (data) => {
        console.log("User name updated:", data);
        localStorage.setItem("userName", data.name || ""); // Update localStorage
      },
      onError: (error) => {
        console.error("Failed to update user name:", error);
      },
    });
  }
  