"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import { Movie, useMovies } from "./hooks/useMovies";

export default function HomePage() {
    const [bookmarks, setBookmarks] = useState<Movie[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { data: movies, isLoading } = useMovies()

    useEffect(() => {
        const result = localStorage.getItem("isLoggedIn")
        setIsLoggedIn(result === "true" ? true : false)
    })

    if (isLoading) {
        return <div> Loading...</div>
    }

    const handleBookmarkClick = (movie: Movie) => {
        if (!isLoggedIn) {
            alert("Please login or signup to bookmark movies.");
            return;
        }

        setBookmarks((prev) =>
            prev.find((item) => item.id === movie.id)
                ? prev.filter((item) => item.id !== movie.id)
                : [...prev, movie]
        );
    };

    return (
        <>
            <NavBar />
            <div className="p-6 bg-black min-h-screen">
                <h1 className="text-4xl font-bold text-red-500 mb-6">Movies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {movies && movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
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