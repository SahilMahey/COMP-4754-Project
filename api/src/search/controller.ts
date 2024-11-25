import { Request, Response } from "express";
import db from '../db'

const searchMovies = async (req: Request, res: Response):Promise<any> => {
    try {
        const searchParam = req.query.q as string;

        if (!searchParam) {
            
            return res.json("No Search Value Found");
        }

        const result = await db.query(
            "SELECT * FROM movies WHERE title ILIKE $1",
            [`%${searchParam}%`]
        );
        if (result.rows.length === 0) {
            return res.json({ message: "No movies found" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Error: ', error)
    }
}

export default { searchMovies }