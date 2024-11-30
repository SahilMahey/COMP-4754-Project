"use client";

import React from "react";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard"; // Import MovieCard component
import { useMoviesByPopularity } from "../hooks/useMoviesByPopularity";

export default function Popularity() {
  const { data: movies, isLoading, error } = useMoviesByPopularity();

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="p-6 bg-black min-h-screen flex items-center justify-center">
          <h1 className="text-white text-2xl">Loading...</h1>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="p-6 bg-black min-h-screen flex items-center justify-center">
          <h1 className="text-red-500 text-2xl">Error fetching movies by popularity</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="p-6 bg-black min-h-screen">
        <h1 className="text-4xl font-bold text-red-500 mb-6 text-center">
          Top 10 Popular Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isBookmarked={false} // Pass default or fetched bookmark state if applicable
              onDetailsClick={() => alert(`Details of ${movie.title}`)}
              onBookmarkClick={() => alert(`${movie.title} bookmarked!`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
