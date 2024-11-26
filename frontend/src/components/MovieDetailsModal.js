import React from "react";

export default function MovieDetailsModal({ movie, onClose }) {
    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg"
                >
                    ✖
                </button>

                {/* Movie Details */}
                <img
                    src={movie.poster || "/placeholder.png"}
                    alt={movie.title}
                    className="rounded-lg w-full h-60 object-cover mb-4"
                />
                <h2 className="text-3xl font-bold text-red-500 mb-4">
                    {movie.title}
                </h2>
                <p className="text-gray-300 mb-2">
                    <strong>Genre:</strong> {movie.genre}
                </p>
                <p className="text-gray-300 mb-2">
                    <strong>Rating:</strong> {movie.rating}
                </p>
                <p className="text-gray-300 mb-2">
                    <strong>Year:</strong> {movie.year}
                </p>
                <p className="text-gray-300 mb-4">
                    <strong>Description:</strong> {movie.description}
                </p>
                <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
