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
    const { userId } = req.params;
    if (!userId) {
        res.json({ message: "Send a userId", success: false });
        return;
    }

    try {
        const result = await db.query(
            `
            SELECT 
                u.id AS user_id, 
                m.*,
                ARRAY_AGG(DISTINCT g.name) as genres,
                ARRAY_AGG(DISTINCT pc.name) as production_companies
            FROM user_bookmarks ub
            JOIN users u ON ub.user_id = u.id
            JOIN movies m ON ub.movie_id = m.id
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            LEFT JOIN movie_production_companies mpc ON m.id = mpc.movie_id
            LEFT JOIN production_companies pc ON mpc.company_id = pc.id
            WHERE ub.user_id = $1
            GROUP BY u.id, m.id
            `,
            [userId]
        );
        res.json({
            success: true,
            data: result.rows,
            message: "User bookmarks retrieved with join"
        });
    } catch (error) {
        console.log('Error', error)
        res.json({ success: false, message: error });
    }
}

export default { addMovieToBookMarks, retrieveUserBookMarks }