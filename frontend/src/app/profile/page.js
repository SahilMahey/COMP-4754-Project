"use client";

import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email); // Retrieve email from localStorage
  }, []);

  if (!userEmail) {
    return <p>Error: Email not found. Please log in.</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {userEmail}</p>
    </div>
  );
}
