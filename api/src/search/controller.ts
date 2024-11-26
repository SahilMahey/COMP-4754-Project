import { Request, Response } from "express";
import db from '../db';

const searchMovies = async (req: Request, res: Response): Promise<any> => {
    try {
        const { query, year, yearComparison, runtime, runtimeComparison, type } = req.query;

        // Base query: Always select from the movies table
        let queryText = `
            SELECT 
                m.*,
                ARRAY_AGG(DISTINCT g.name) as genres,
                ARRAY_AGG(DISTINCT pc.name) as production_companies
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            LEFT JOIN movie_production_companies mpc ON m.id = mpc.movie_id
            LEFT JOIN production_companies pc ON mpc.company_id = pc.id
            WHERE 1=1
            `
        let queryParams: any[] = []; // Initialize query parameters

        if (query) {
            queryText += ` AND title ILIKE $${queryParams.length + 1}`;
            queryParams.push(`%${query}%`); // Add the query parameter
        }

        if ((year && !/^\d{4}$/.test(year as string)) || (runtime && isNaN(Number(runtime)))) {
            return res.json({
                message: "Invalid input format. Please ensure:\n" +
                    "- Year is a 4-digit number (e.g., 2022).\n" +
                    "- Runtime is a valid number (e.g., 120)."
            });
        }



        // Validate year input and apply filter if provided
        if (year && yearComparison) {
            if (!["<", ">", "="].includes(yearComparison as string)) {
                return res.json({ message: "Invalid year comparison operator. Use <, >, or =." });
            }
            queryText += ` AND EXTRACT(YEAR FROM release_date) ${yearComparison} $${queryParams.length + 1}`;
            queryParams.push(year); // Add year to queryParams
        }

        // Validate runtime input and apply filter if provided
        if (runtime && runtimeComparison) {
            if (!["<", ">", "="].includes(runtimeComparison as string)) {
                return res.json({ message: "Invalid runtime comparison operator. Use <, >, or =." });
            }
            queryText += ` AND runtime ${runtimeComparison} $${queryParams.length + 1}`;
            queryParams.push(runtime); // Add runtime to queryParams
        }

        // Apply type filter if provided
        if (type) {
            const validTypes = ["Movie", "Web Series"];
            if (!validTypes.includes(type as string)) {
                return res.json({ message: "Invalid type. Valid options are 'Movie' or 'Web Series'." });
            }
            queryText += ` AND type = $${queryParams.length + 1}`;
            queryParams.push(type); // Add type to queryParams
        }
        queryText += `
            GROUP BY m.id
            ORDER BY m.release_date DESC, m.title
            LIMIT 100
        `;

        const result = await db.query(queryText, queryParams);

        res.json(result.rows);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default { searchMovies };
