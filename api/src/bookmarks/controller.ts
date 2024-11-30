import { Request, Response } from "express";
import db from "../db";

const addMovieToBookMarks = async (req: Request, res: Response) => {
    const { movieId, userId } = req.body;
    if (!movieId || !userId) {
        res.status(400).json({ message: "Send a movieId and userId", success: false });
        return;
    }

    try {
        const result = await db.query(
            `
            INSERT INTO user_bookmarks (user_id, movie_id)
            VALUES ($1, $2)
            RETURNING user_id, movie_id
            `,
            [userId, movieId]
        );
        res.status(201).json({ success: true, data: result.rows[0], message: "Added user bookmarks to database" });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ success: false, message: errorMessage });
    }
};

const retrieveUserBookMarks = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({ message: "Send a userId", success: false });
        return;
    }

    try {
        const result = await db.query(
            `
            SELECT u.id AS user_id, u.username, m.*
            FROM user_bookmarks ub
            JOIN users u ON ub.user_id = u.id
            JOIN movies m ON ub.movie_id = m.id
            WHERE ub.user_id = $1
            `,
            [userId]
        );
        res.status(200).json({
            success: true,
            data: result.rows,
            message: "User bookmarks retrieved with join"
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ success: false, message: errorMessage });
    }
};

export default { addMovieToBookMarks, retrieveUserBookMarks };
