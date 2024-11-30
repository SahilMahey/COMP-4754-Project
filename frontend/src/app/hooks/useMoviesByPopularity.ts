"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "../axios-instance";
import { Movie } from "./useMovies";

export const useMoviesByPopularity = () => {
  return useQuery<Movie[]>({
    queryKey: ['movies', 'popularity'], // Cache key for react-query
    queryFn: async () => {
      const { data } = await axios.get(`/popularity`); // Fetch data from the popularity endpoint
      return data;
    },
  });
};
