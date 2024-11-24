import React, { useState } from "react";

export default function MovieCard({ title, rating, genre, onDetailsClick, onBookmarkClick, isBookmarked }) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform hover:scale-105 hover:bg-gray-700">
            <h2 className="text-2xl font-bold text-red-500">{title}</h2>
            <p className="text-gray-300 mt-2">Genre: {genre}</p>
            <p className="text-gray-300 mt-2">Rating: {rating}</p>
            <div className="flex items-center justify-between mt-4">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    onClick={onDetailsClick}
                >
                    View Details
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        isBookmarked ? "bg-green-500 hover:bg-green-600" : "bg-gray-600 hover:bg-gray-700"
                    } transition-colors`}
                    onClick={onBookmarkClick}
                >
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
            </div>
        </div>
    );
}
