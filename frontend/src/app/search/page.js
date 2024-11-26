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
        yearComparison: "=",
        runtime: "",
        runtimeComparison: "=",
        type: "Movie", // Default type is "Movie"
    });
    const [errorMessage, setErrorMessage] = useState(""); // State to store error message

    // Function to handle search
    const handleSearch = async () => {
        console.log(query);
        console.log(filters.year);
        console.log(filters.yearComparison);
        console.log(filters.runtime);
        console.log(filters.runtimeComparison);
        console.log(filters.type); // Log the selected type

        if (!query && !filters.year && !filters.runtime && !filters.type) return; // Only search if there's a query or filters

        setLoading(true);
        setErrorMessage(""); // Reset the error message

        // Send the search parameters to the backend
        try {
            const response = await fetch(
                `http://localhost:3000/api/search?query=${query}&year=${filters.year}&yearComparison=${filters.yearComparison}&runtime=${filters.runtime}&runtimeComparison=${filters.runtimeComparison}&type=${filters.type}`
            );
            const data = await response.json();
            console.log(data); // Log the fetched data

            if (data.message) {
                setErrorMessage(data.message); // If there's a message from the backend (like "No movies found"), set it
                setMovies([]); // Clear the movie list if no results
            } else {
                setMovies(data); // Update the movie state with the response data
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            setErrorMessage("An error occurred while fetching movies. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Handle changes in input fields
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
                    {/* Query input field */}
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {/* Year input field */}
                    <input
                        type="text"
                        placeholder="Enter year (e.g., 2020)"
                        value={filters.year}
                        onChange={handleFilterChange}
                        name="year"
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {/* Year comparison selector */}
                    <select
                        name="yearComparison"
                        value={filters.yearComparison}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="=">Equal to</option>
                        <option value=">">Greater than</option>
                        <option value="<">Less than</option>
                    </select>

                    {/* Runtime input field */}
                    <input
                        type="text"
                        placeholder="Enter runtime (e.g., 120)"
                        value={filters.runtime}
                        onChange={handleFilterChange}
                        name="runtime"
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {/* Runtime comparison selector */}
                    <select
                        name="runtimeComparison"
                        value={filters.runtimeComparison}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="=">Equal to</option>
                        <option value=">">Greater than</option>
                        <option value="<">Less than</option>
                    </select>

                    {/* Type selector */}
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="Movie">Movie</option>
                        <option value="Web Series">Web Series</option>
                    </select>

                    {/* Search button */}
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
                ) : errorMessage ? (
                    <p className="text-gray-400 text-lg">{errorMessage}</p> // Display error message from backend
                ) : movies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                rating={movie.vote_average}
                                genre={movie.genre} // Assuming you have a genre property
                                onDetailsClick={() => alert(`Details of ${movie.title}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg">Search For Movies.</p> // If no data and no message from backend
                )}
            </div>
        </>
    );
}