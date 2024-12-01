import React, { useState } from "react";
import { useCreateBookmark } from "@/app/hooks/useBookmarks";

function MovieModal({ movie, setIsModalOpen }) {
  const {
    poster_path,
    title,
    overview,
    genres,
    vote_average,
    release_date,
    runtime,
    status,
    type,
    popularity,
    production_companies,
  } = movie;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/95 p-8 rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700">
        <div className="flex flex-col md:flex-row gap-8">
          {poster_path && (
            <div className="flex-shrink-0">
              <img
                src={poster_path}
                alt={title}
                className="w-64 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-red-500 mb-6">{title}</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                <span className="font-semibold text-red-400">Overview:</span>{" "}
                {overview}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-300">
                  <span className="font-semibold text-red-400">Genre:</span>{" "}
                  {genres.join(", ")}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-red-400">Rating:</span>{" "}
                  {vote_average}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-red-400">
                    Release Date:
                  </span>{" "}
                  {new Date(release_date).toLocaleDateString()}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-red-400">Runtime:</span>{" "}
                  {runtime} minutes
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-red-400">Status:</span>{" "}
                  {status}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-red-400">Type:</span>{" "}
                  {type}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-red-400">
                    Popularity:
                  </span>{" "}
                  {popularity}
                </p>
              </div>
              <p className="text-gray-300 col-span-full">
                <span className="font-semibold text-red-400">
                  Production Companies:
                </span>{" "}
                {production_companies.join(", ")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MovieCard({
  movie,
  onDetailsClick,
  onBookmarkClick,
  isBookmarked,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createBookmark = useCreateBookmark();

  const handleDetailsClick = () => {
    setIsModalOpen(true);
  };

  const handleBookmarkClick = async () => {
    if (!isBookmarked) {
      createBookmark.mutate(
        { userId: 1, movieId: movie.id },
        {
          onSuccess: () => {
            onBookmarkClick();
          },
        }
      );
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform hover:scale-105 hover:bg-gray-700">
        <h2 className="text-2xl font-bold text-red-500">{movie.title}</h2>
        <p className="text-gray-300 mt-2">Genre: {movie.genres.join()}</p>
        <p className="text-gray-300 mt-2">Rating: {movie.vote_average}</p>
        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={handleDetailsClick}
          >
            View Details
          </button>
          <button
            className={`px-4 py-2 rounded ${
              isBookmarked
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-600 hover:bg-gray-700"
            } transition-colors`}
            onClick={handleBookmarkClick}
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <MovieModal movie={movie} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}
