import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './page';
import SearchPage from './search/page';
import RecommendationPage from './recommendation/page';
import ProfilePage from './profile/page';
import RecordsPage from './records/page';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/recommendation" element={<RecommendationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/records" element={<RecordsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
