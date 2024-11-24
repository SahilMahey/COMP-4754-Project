import React, { useState } from "react";
import Link from "next/link";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Placeholder logic for login
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Placeholder logic for logout
        setIsLoggedIn(false);
    };

    return (
        <nav className="bg-black p-4 border-b-2 border-red-500">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-3xl font-bold text-red-500"></h1>

                {/* Navigation Links */}
                <div className="flex space-x-6">
                    <Link href="/" className="text-gray-300 text-lg hover:text-red-500 transition-colors">
                        Home
                    </Link>
                    <Link href="/search" className="text-gray-300 text-lg hover:text-red-500 transition-colors">
                        Search
                    </Link>
                    <Link href="/recommendation" className="text-gray-300 text-lg hover:text-red-500 transition-colors">
                        Recommendation
                    </Link>
                    <Link href="/records" className="text-gray-300 text-lg hover:text-red-500 transition-colors">
                        Records
                    </Link>
                    {isLoggedIn && (
                        <Link href="/profile" className="text-gray-300 text-lg hover:text-red-500 transition-colors">
                            Profile
                        </Link>
                    )}
                </div>

                {/* Login/Signup or Logout */}
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleLogin}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Login
                            </button>
                            <Link href="/signup" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
