"use client";

import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import MovieCard from "../../components/MovieCard";
import { useSearch } from "../hooks/useSearch";

export default function SearchPage() {
  const [inputValues, setInputValues] = useState({
    query: "",
    filters: {
      year: "",
      yearComparison: "=",
      runtime: "",
      runtimeComparison: "=",
      type: "Movie",
    },
  });

  const [searchParams, setSearchParams] = useState({
    query: "",
    filters: {
      year: "",
      yearComparison: "=",
      runtime: "",
      runtimeComparison: "=",
      type: "Movie",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { data: movies, isLoading } = useSearch(searchParams);

  const handleSearch = () => {
    const { query, filters } = inputValues;
    if (!query && !filters.year && !filters.runtime && !filters.type) return;
    setErrorMessage("");
    setSearchParams({
      query,
      filters,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [name]: value,
      },
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
            name="query"
            value={inputValues.query}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Year input field */}
          <input
            type="text"
            placeholder="Enter year (e.g., 2020)"
            name="year"
            value={inputValues.filters.year}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Year comparison selector */}
          <select
            name="yearComparison"
            value={inputValues.filters.yearComparison}
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
            name="runtime"
            value={inputValues.filters.runtime}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Runtime comparison selector */}
          <select
            name="runtimeComparison"
            value={inputValues.filters.runtimeComparison}
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
            value={inputValues.filters.type}
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
        {isLoading ? (
          <p className="text-gray-200 text-lg">Loading...</p>
        ) : errorMessage ? (
          <p className="text-gray-400 text-lg">{errorMessage}</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onDetailsClick={() => alert(`Details of ${movie.title}`)}
              />
            ))}
          </div>
        ) : searchParams.query.length > 0 ? (
          <p className="text-gray-400 text-lg"> No Result found</p>
        ) : (
          <p className="text-gray-400 text-lg"> Search for movies</p>
        )}
      </div>
    </>
  );
}
