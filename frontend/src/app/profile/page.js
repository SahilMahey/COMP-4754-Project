"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { useUpdateUserName } from "../hooks/useAuth";

export default function ProfilePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newName, setNewName] = useState("");

    const { mutate: updateUserName } = useUpdateUserName();

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            const name = localStorage.getItem("userName") || "John Doe";
            const email = localStorage.getItem("userEmail") || "johndoe@example.com";
            setUserData({ name, email });
        }
    }, []);

    const handleOpenEditModal = () => {
        setNewName(userData.name);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveNewName = () => {
        const { email } = userData;

        updateUserName(
            { email, name: newName },
            {
                onSuccess: (data) => {
                    setUserData((prev) => ({ ...prev, name: data.name }));
                    localStorage.setItem("userName", data.name); // Update localStorage
                    setIsEditModalOpen(false);
                },
                onError: (error) => {
                    console.error("Failed to update name:", error);
                },
            }
        );
    };

    return (
        <>
            <NavBar />

            <div className="p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen">
                {isLoggedIn ? (
                    <div className="max-w-2xl mx-auto text-white">
                        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                            <h1 className="text-4xl font-extrabold text-red-500 mb-6 text-center">
                                Your Profile
                            </h1>
                            <div className="mb-4">
                                <p className="text-lg font-medium text-gray-300">
                                    <strong>Name:</strong> {userData.name}
                                </p>
                                <p className="text-lg font-medium text-gray-300">
                                    <strong>Email:</strong> {userData.email}
                                </p>
                                <p className="text-lg font-medium text-gray-300">
                                    <strong>Member since:</strong> January 2023
                                </p>
                            </div>
                            <button
                                className="mt-6 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transform transition-transform"
                                onClick={handleOpenEditModal}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-extrabold text-red-500 mb-4">Profile</h1>
                        <p className="text-gray-300 text-lg">
                            Please login to view your profile.
                        </p>
                    </div>
                )}
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-8 rounded-lg w-96 shadow-xl relative">
                        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
                            Edit Profile
                        </h2>
                        <form>
                            <label className="block text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-all"
                                    onClick={handleCloseEditModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transform transition-transform"
                                    onClick={handleSaveNewName}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
