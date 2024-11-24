"use client";

import React, { useState } from "react";
import NavBar from "../../components/NavBar";

export default function ProfilePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            {/* Navigation Bar */}
            <NavBar />

            {/* Profile Content */}
            <div className="p-6 bg-black min-h-screen">
                {isLoggedIn ? (
                    <div className="text-white">
                        <h1 className="text-4xl font-bold text-red-500 mb-4">Your Profile</h1>
                        <p className="text-gray-300 mb-2">Name: John Doe</p>
                        <p className="text-gray-300 mb-2">Email: johndoe@example.com</p>
                        <p className="text-gray-300">Member since: January 2023</p>
                        <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <div className="text-white">
                        <h1 className="text-4xl font-bold text-red-500 mb-4">Profile</h1>
                        <p className="text-gray-300">Please login to view your profile.</p>
                        <Link href="/" className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors">
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
