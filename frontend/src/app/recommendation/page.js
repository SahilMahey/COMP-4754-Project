"use client";

import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard";

export default function RecommendationPage() {
    const [recommendation, setRecommendation] = useState(null);
    const [filters, setFilters] = useState({
        genre: "",
        rating: "",
    });

    const movies = [
        { id: 1, title: "Inception", rating: 8.8, genre: "Sci-Fi", type: "Movie" },
        { id: 2, title: "The Dark Knight", rating: 9.0, genre: "Action", type: "Movie" },
        { id: 3, title: "Interstellar", rating: 8.6, genre: "Adventure", type: "Movie" },
        { id: 4, title: "Breaking Bad", rating: 9.5, genre: "Drama", type: "Web Series" },
    ];

    const getRecommendation = () => {
        let filteredMovies = movies;

        // Apply filters
        if (filters.genre) {
            filteredMovies = filteredMovies.filter((movie) =>
                movie.genre.toLowerCase().includes(filters.genre.toLowerCase())
            );
        }
        if (filters.rating) {
            filteredMovies = filteredMovies.filter((movie) => movie.rating >= parseFloat(filters.rating));
        }

        // Randomly select a movie
        const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
        setRecommendation(randomMovie || null); // If no movie matches, set recommendation to null
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <>
            {/* Navigation Bar */}
            <NavBar />

            {/* Page Content */}
            <div className="p-6 bg-black min-h-screen">
                <h1 className="text-4xl font-bold text-red-500 mb-6">Recommendations</h1>

                {/* Filter and Recommend Button */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <select
                        name="genre"
                        value={filters.genre}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Genre</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Drama">Drama</option>
                    </select>

                    <select
                        name="rating"
                        value={filters.rating}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Minimum Rating</option>
                        <option value="8">8+</option>
                        <option value="9">9+</option>
                    </select>

                    <button
                        onClick={getRecommendation}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Get Recommendation
                    </button>
                </div>

                {/* Recommendation Result */}
                {recommendation ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <MovieCard
                            title={recommendation.title}
                            rating={recommendation.rating}
                            genre={recommendation.genre}
                            onDetailsClick={() => alert(`Details of ${recommendation.title}`)}
                        />
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg">
                        {filters.genre || filters.rating
                            ? "No movies match your filters."
                            : "Click the button to get a recommendation!"}
                    </p>
                )}
            </div>
        </>
    );
}
