"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import MovieDetailsModal from "../components/MovieDetailsModal";

export default function HomePage() {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Inception",
            rating: 8.8,
            genre: "Sci-Fi",
            poster: "/inception.jpg",
            year: 2010,
            description:
                "A skilled thief steals valuable secrets from the subconscious during the dream state.",
        },
        {
            id: 2,
            title: "The Dark Knight",
            rating: 9.0,
            genre: "Action",
            poster: "/dark-knight.jpg",
            year: 2008,
            description:
                "When the menace known as the Joker emerges, he wreaks havoc on Gotham.",
        },
    ]);

    const [bookmarks, setBookmarks] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); // Modal logic

    // Load bookmarks from localStorage
    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarks(savedBookmarks);
    }, []);

    // Save bookmarks to localStorage
    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const handleBookmarkClick = (movie) => {
        setBookmarks((prev) =>
            prev.find((item) => item.id === movie.id)
                ? prev.filter((item) => item.id !== movie.id)
                : [...prev, movie]
        );
    };

    const handleDetailsClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null); // Close the modal
    };

    return (
        <>
            <NavBar />
            <div className="p-6 bg-black min-h-screen">
                <h1 className="text-4xl font-bold text-red-500 mb-6">Top Movies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            rating={movie.rating}
                            genre={movie.genre}
                            poster={movie.poster}
                            isBookmarked={!!bookmarks.find((item) => item.id === movie.id)}
                            onDetailsClick={() => handleDetailsClick(movie)}
                            onBookmarkClick={() => handleBookmarkClick(movie)}
                        />
                    ))}
                </div>
            </div>

            {/* Movie Details Modal */}
            {selectedMovie && (
                <MovieDetailsModal
                    movie={selectedMovie}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}
