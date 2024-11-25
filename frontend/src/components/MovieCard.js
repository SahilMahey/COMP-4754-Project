import React from "react";

export default function MovieCard({
    title,
    rating,
    genre,
    poster,
    onDetailsClick,
    onBookmarkClick,
    isBookmarked,
}) {
    return (
        <div
            className="bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition-transform hover:scale-105 cursor-pointer"
            onClick={onDetailsClick}
        >
            {/* Poster */}
            <img
                src={poster || "/placeholder.png"} // Fallback image
                alt={title}
                className="rounded-lg w-full h-48 object-cover mb-4"
            />

            {/* Movie Info */}
            <h3 className="text-lg font-bold text-red-500">{title}</h3>
            <p className="text-gray-400 text-sm mt-2">{genre}</p>
            <p className="text-gray-400 text-sm">Rating: {rating || "N/A"}</p>

            {/* Bookmark Button */}
            {onBookmarkClick && (
                <div className="flex items-center justify-end mt-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            isBookmarked
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-600 hover:bg-gray-700"
                        } transition-colors`}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click from triggering modal
                            onBookmarkClick();
                        }}
                    >
                        {isBookmarked ? "Bookmarked" : "Bookmark"}
                    </button>
                </div>
            )}
        </div>
    );
}
