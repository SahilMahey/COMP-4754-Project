"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard";
import MovieDetailsModal from "../../components/MovieDetailsModal";
import axios from "../axios-instance";

const fetchRecommendations = async ({ queryKey }) => {
    const [, filters] = queryKey; // Extract filters
    const { data } = await axios.get(`/recommendations`, {
        params: {
            genre: filters.genre || "",
            rating: filters.rating || "",
        },
    });
    return data;
};

export default function RecommendationPage() {
    const [filters, setFilters] = useState({
        genre: "",
        rating: "",
    });
    const [selectedMovie, setSelectedMovie] = useState(null);

    const { data: recommendations, isLoading, error } = useQuery(
        ["recommendations", filters],
        fetchRecommendations,
        {
            enabled: !!filters.genre || !!filters.rating, // Fetch only if filters are set
        }
    );

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
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
                <h1 className="text-4xl font-bold text-red-500 mb-6">Recommendations</h1>

                {/* Filter Section */}
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
                </div>

                {/* Recommendations Section */}
                {isLoading ? (
                    <p className="text-gray-400">Loading recommendations...</p>
                ) : error ? (
                    <p className="text-gray-400">Error fetching recommendations.</p>
                ) : recommendations?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommendations.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                rating={movie.rating}
                                genre={movie.genre}
                                poster={movie.poster}
                                onDetailsClick={() => handleDetailsClick(movie)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">
                        {filters.genre || filters.rating
                            ? "No movies match your filters."
                            : "Set filters to get recommendations!"}
                    </p>
                )}
            </div>

            {/* Movie Details Modal */}
            {selectedMovie && (
                <MovieDetailsModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </>
    );
}
