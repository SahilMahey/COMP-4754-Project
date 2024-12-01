import { Request, Response } from "express"
import db from '../db'

const addMovieToBookMarks = async (req: Request, res: Response) => {
    const { movieId, userId } = req.body
    if (!movieId && !userId) {
        res.json({ message: "Send a movieId and userId", success: false })
    }
    const result = await db.query(`
        INSERT INTO user_bookmarks (user_id, movie_id)
        VALUES ($1, $2)
        RETURNING user_id, movie_id
        `,
        [userId, movieId]
    )
    res.json({ success: true, data: result.rows[0], message: "Add user bookmarks to database" })
}

const retrieveUserBookMarks = async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) {
        res.json({ message: "Send a userId", success: false });
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
        res.json({
            success: true,
            data: result.rows,
            message: "User bookmarks retrieved with join"
        });
    } catch (error) {
        res.json({ success: false, message: error });
    }
}

export default { addMovieToBookMarks, retrieveUserBookMarks }