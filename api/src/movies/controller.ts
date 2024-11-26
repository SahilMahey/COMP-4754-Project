import { Request, Response } from "express";
import db from '../db'

const getMovies = async (req: Request, res: Response) => {
    try {
        const result = await db.query(`
            SELECT 
                m.*,
                ARRAY_AGG(DISTINCT g.name) as genres,
                ARRAY_AGG(DISTINCT pc.name) as production_companies
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            LEFT JOIN movie_production_companies mpc ON m.id = mpc.movie_id
            LEFT JOIN production_companies pc ON mpc.company_id = pc.id
            GROUP BY m.id                         
            `)
        res.json(result.rows)
    } catch (error) {
        console.error('Error: ', error)
    }
}

export default { getMovies }