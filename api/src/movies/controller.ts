import { Request, Response } from "express";
import db from '../db'

const getMovies = async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM movies')
        res.json(result.rows)
    } catch (error) {
        console.error('Error: ', error)
    }
}

export default { getMovies }