import { Request, Response } from "express";
import db from "../db";

const get_top_10_votes = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await db.query(
            "SELECT * FROM movies ORDER BY CAST(vote_average AS FLOAT) DESC LIMIT 10"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default { get_top_10_votes };
