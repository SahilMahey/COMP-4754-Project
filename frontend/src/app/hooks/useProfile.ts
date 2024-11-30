"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "../axios-instance";

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export const useProfile = (email: string) => {
  return useQuery<UserProfile>({
    queryKey: ["profile", email],
    queryFn: async () => {
      if (!email) {
        throw new Error("Email is required to fetch the profile");
      }

      const response = await axios.get(`/users/profile?email=${email}`);
      return response.data.data; // Assuming API response contains "data"
    },
    retry: false, // Avoid retries for invalid requests
  });
};
