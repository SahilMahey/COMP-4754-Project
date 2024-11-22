"use client";

import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        year: "",
        runtime: "",
        type: "",
    });

    const handleSearch = async () => {
        if (!query && !filters.year && !filters.runtime && !filters.type) return;

        setLoading(true);

        // Simulated API call with filtering logic
        setTimeout(() => {
            const allMovies = [
                { id: 1, title: "Inception", rating: 8.8, genre: "Sci-Fi", year: 2010, runtime: 148, type: "Movie" },
                { id: 2, title: "The Dark Knight", rating: 9.0, genre: "Action", year: 2008, runtime: 152, type: "Movie" },
                { id: 3, title: "Interstellar", rating: 8.6, genre: "Adventure", year: 2014, runtime: 169, type: "Movie" },
                { id: 4, title: "Breaking Bad", rating: 9.5, genre: "Drama", year: 2008, runtime: 47, type: "Web Series" },
            ];

            const filteredMovies = allMovies.filter((movie) => {
                return (
                    (!query || movie.title.toLowerCase().includes(query.toLowerCase())) &&
                    (!filters.year || movie.year === parseInt(filters.year)) &&
                    (!filters.runtime || movie.runtime <= parseInt(filters.runtime)) &&
                    (!filters.type || movie.type.toLowerCase() === filters.type.toLowerCase())
                );
            });

            setMovies(filteredMovies);
            setLoading(false);
        }, 1000);
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
                <h1 className="text-4xl font-bold text-red-500 mb-6">Search Movies</h1>

                {/* Search and Filter Bar */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {/* Filters */}
                    <select
                        name="year"
                        value={filters.year}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Year</option>
                        <option value="2008">2008</option>
                        <option value="2010">2010</option>
                        <option value="2014">2014</option>
                    </select>

                    <select
                        name="runtime"
                        value={filters.runtime}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Runtime (mins)</option>
                        <option value="60">Up to 60 mins</option>
                        <option value="120">Up to 120 mins</option>
                        <option value="150">Up to 150 mins</option>
                    </select>

                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Type</option>
                        <option value="Movie">Movie</option>
                        <option value="Web Series">Web Series</option>
                    </select>

                    <button
                        onClick={handleSearch}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Search
                    </button>
                </div>

                {/* Results Section */}
                {loading ? (
                    <p className="text-gray-200 text-lg">Loading...</p>
                ) : movies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                rating={movie.rating}
                                genre={movie.genre}
                                onDetailsClick={() => alert(`Details of ${movie.title}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg">No results found.</p>
                )}
            </div>
        </>
    );
}
