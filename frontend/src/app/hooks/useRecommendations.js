"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "../axios-instance";

export const useRecommendations = (filters) => {
    return useQuery({
        queryKey: ["recommendations", filters],
        queryFn: async () => {
            const { data } = await axios.get(`/recommendations`, {
                params: {
                    genre: filters.genre || "",
                    rating: filters.rating || "",
                },
            });
            return data;
        },
        enabled: !!filters.genre || !!filters.rating, // Fetch only when filters are set
    });
    
};
