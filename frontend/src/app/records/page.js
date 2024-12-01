"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard";
import MovieDetailsModal from "../../components/MovieDetailsModal";
import { useBookmarks } from "@/app/hooks/useBookmarks";

export default function RecordsPage() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const userId = localStorage.getItem("userId");
  const { data: bookmarks, isLoading, error } = useBookmarks(userId);

  console.log("Bookmarks", bookmarks);
  if (isLoading) return <div>Loading...</div>;

  const handleRemoveBookmark = (movie) => {
    const updatedBookmarks = bookmarks.filter((item) => item.id !== movie.id);
  };

  const handleDetailsClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <NavBar />
      <div className="p-6 bg-black min-h-screen">
        <h1 className="text-4xl font-bold text-red-500 mb-6">
          Your Bookmarked Movies
        </h1>
        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookmarks.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie} // Pass the entire movie object
                onDetailsClick={() => handleDetailsClick(movie)}
                onBookmarkClick={() => handleRemoveBookmark(movie)}
                isBookmarked={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You have no bookmarked movies.</p>
        )}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
