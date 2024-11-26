import { Request, Response } from "express";
import db from '../db';

const searchMovies = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log(req.query);
        const { query, year, yearComparison, runtime, runtimeComparison, type } = req.query;
        console.log(query);
        console.log(year);
        console.log(runtime);
        console.log(type);

        // Base query: Always select from the movies table
        let queryText = "SELECT * FROM movies WHERE 1=1"; // Start with a condition that is always true
        let queryParams: any[] = []; // Initialize query parameters

        // If a search query is provided, filter by title
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

        // Perform the database query
        console.log(queryParams);
        const result = await db.query(queryText, queryParams);

        // If no results, return a message
        if (result.rows.length === 0) {
            return res.json({ message: "No movies found matching the filters" });
        }

        // Return the query results
        res.json(result.rows);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default { searchMovies };
