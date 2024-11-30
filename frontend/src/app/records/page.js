"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard";

export default function RecordsPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch("/api/bookmarks/1"); // Replace 1 with the logged-in user's ID
        const data = await response.json();
        if (data.success) {
          setBookmarks(data.data); // Assuming data.data contains the bookmarks
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <>
      <NavBar />
      <div className="p-6 bg-black min-h-screen">
        <h1 className="text-4xl font-bold text-red-500 mb-6">Your Bookmarked Movies</h1>
        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookmarks.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isBookmarked={true} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You have no bookmarked movies.</p>
        )}
      </div>
    </>
  );
}
