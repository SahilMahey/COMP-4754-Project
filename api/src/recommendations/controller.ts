import { Request, Response } from "express";
import db from "../db";

const getRecommendations = async (req: Request, res: Response): Promise<any> => {
    try {
        const { genre, rating } = req.query;

        let queryText = `
            SELECT 
                m.id, m.title, m.poster_path AS poster, m.vote_average AS rating, 
                ARRAY_AGG(DISTINCT g.name) AS genre
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            WHERE 1=1
        `;

        const queryParams: any[] = [];

        // Apply genre filter
        if (genre) {
            queryText += ` AND g.name = $${queryParams.length + 1}`;
            queryParams.push(genre);
        }

        // Apply rating filter
        if (rating) {
            queryText += ` AND m.vote_average >= $${queryParams.length + 1}`;
            queryParams.push(rating);
        }

        // Randomize results and limit
        queryText += `
            GROUP BY m.id
            ORDER BY RANDOM()
            LIMIT 20;
        `;

        const result = await db.query(queryText, queryParams);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default { getRecommendations };
