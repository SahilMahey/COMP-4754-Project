"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Fetch random movies from the backend
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/movies/"); // Replace with your backend endpoint
                console.log(response)
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setMovies(data);
                } else {
                    console.error("Failed to fetch movies");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

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
                            rating={movie.vote_average} // Updated field
                            genres={movie.genres || "Unknown"} // Use 'Unknown' if genre is missing
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