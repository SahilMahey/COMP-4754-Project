"use client";

import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard";
import MovieDetailsModal from "../../components/MovieDetailsModal";

export default function RecommendationPage() {
    const [recommendations, setRecommendations] = useState([]);
    const [filters, setFilters] = useState({
        genre: "",
        rating: "",
    });
    const [selectedMovie, setSelectedMovie] = useState(null); // For modal
    const [bookmarks, setBookmarks] = useState(() => {
        return JSON.parse(localStorage.getItem("bookmarks")) || [];
    });

    const movies = [
        { id: 1, title: "Inception", rating: 8.8, genre: "Sci-Fi", type: "Movie", description: "A skilled thief...", poster: "/inception.jpg" },
        { id: 2, title: "The Dark Knight", rating: 9.0, genre: "Action", type: "Movie", description: "When the Joker...", poster: "/dark-knight.jpg" },
        { id: 3, title: "Interstellar", rating: 8.6, genre: "Adventure", type: "Movie", description: "Explorers travel...", poster: "/interstellar.jpg" },
        { id: 4, title: "Breaking Bad", rating: 9.5, genre: "Drama", type: "Web Series", description: "A chemistry teacher...", poster: "/breaking-bad.jpg" },
        { id: 5, title: "Avatar", rating: 7.8, genre: "Sci-Fi", type: "Movie", description: "Pandora adventure...", poster: "/avatar.jpg" },
    ];

    const getRecommendations = () => {
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

        // Shuffle and pick up to 4 random recommendations
        const shuffledMovies = filteredMovies.sort(() => 0.5 - Math.random());
        setRecommendations(shuffledMovies.slice(0, 4)); // Display up to 4 movies
    };

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

    const handleBookmarkClick = (movie) => {
        const isAlreadyBookmarked = bookmarks.some((item) => item.id === movie.id);

        if (isAlreadyBookmarked) {
            const updatedBookmarks = bookmarks.filter((item) => item.id !== movie.id);
            setBookmarks(updatedBookmarks);
            localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        } else {
            const updatedBookmarks = [...bookmarks, movie];
            setBookmarks(updatedBookmarks);
            localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        }
    };

    return (
        <>
            <NavBar />
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
                        onClick={getRecommendations}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Get Recommendations
                    </button>
                </div>

                {/* Recommendations Section */}
                {recommendations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommendations.map((movie) => (
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
                ) : (
                    <p className="text-gray-400">
                        {filters.genre || filters.rating
                            ? "No movies match your filters."
                            : "Click the button to get recommendations!"}
                    </p>
                )}
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
