"use client";

import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard";

export default function RecordsPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Placeholder logic for login
    const [bookmarks, setBookmarks] = useState([
        // Example bookmarks (can be passed from HomePage in a real scenario)
        { id: 1, title: "Inception", rating: 8.8, genre: "Sci-Fi" },
        { id: 2, title: "The Dark Knight", rating: 9.0, genre: "Action" },
    ]);

    return (
        <>
            <NavBar />
            <div className="p-6 bg-black min-h-screen">
                <h1 className="text-4xl font-bold text-red-500 mb-6">Your Bookmarked Movies</h1>
                {isLoggedIn ? (
                    bookmarks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {bookmarks.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    title={movie.title}
                                    rating={movie.rating}
                                    genre={movie.genre}
                                    isBookmarked
                                    onDetailsClick={() => alert(`Details of ${movie.title}`)}
                                    onBookmarkClick={() => {
                                        // Handle removing bookmarks from Records Page
                                        setBookmarks((prev) => prev.filter((item) => item.id !== movie.id));
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-lg">No bookmarked movies yet.</p>
                    )
                ) : (
                    <p className="text-gray-400 text-lg">Please login to view your bookmarks.</p>
                )}
            </div>
        </>
    );
}
