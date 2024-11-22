"use client";

import React, { useState } from "react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";

export default function HomePage() {
    const [movies, setMovies] = useState([
        { id: 1, title: "Inception", rating: 8.8, genre: "Sci-Fi" },
        { id: 2, title: "The Dark Knight", rating: 9.0, genre: "Action" },
        { id: 3, title: "Interstellar", rating: 8.6, genre: "Adventure" },
    ]);
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleBookmarkClick = (movie) => {
        if (!isLoggedIn) {
            alert("Please login or signup to bookmark movies.");
            return;
        }

        setBookmarks((prev) =>
            prev.find((item) => item.id === movie.id)
                ? prev.filter((item) => item.id !== movie.id) // Remove if already bookmarked
                : [...prev, movie] // Add if not already bookmarked
        );
    };

    return (
        <>
            <NavBar />
            <div className="p-6 bg-black min-h-screen">
                <h1 className="text-4xl font-bold text-red-500 mb-6">Top Movies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            rating={movie.rating}
                            genre={movie.genre}
                            isBookmarked={!!bookmarks.find((item) => item.id === movie.id)}
                            onDetailsClick={() => alert(`Details of ${movie.title}`)}
                            onBookmarkClick={() => handleBookmarkClick(movie)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
