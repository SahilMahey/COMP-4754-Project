import db from '../src/db';

async function createStoredProcedure() {
    const procedureQuery = `
        DO $$
        BEGIN
            -- Check if the function already exists
            IF NOT EXISTS (
                SELECT 1
                FROM pg_proc
                WHERE proname = 'get_total_movies'
            ) THEN
                -- Create the function if it doesn't exist
                CREATE OR REPLACE FUNCTION get_total_movies()
                RETURNS INTEGER AS $$
                BEGIN
                    RETURN (SELECT COUNT(*) FROM movies);
                END;
                $$ LANGUAGE plpgsql;
            END IF;
        END;
        $$;
    `;

    try {
        await db.query(procedureQuery);
        console.log('Stored procedure "get_total_movies" created or already exists.');
    } catch (error) {
        console.error('Error creating stored procedure:', error);
        throw error;
    }
}

async function getTotalMovies() {
    try {
        const query = `SELECT get_total_movies() AS total_movies;`;
        const result = await db.query(query);
        const totalMovies = result.rows[0].total_movies;

        console.log(`Total movies saved: ${totalMovies}`);
        return totalMovies;
    } catch (error) {
        console.error('Error fetching total movies:', error);
        throw error;
    }
}

async function setupAndFetchTotalMovies() {
    try {
        await createStoredProcedure();
        const totalMovies = await getTotalMovies();
        console.log(`Total movies: ${totalMovies}`);
    } catch (error) {
        console.error('Error during setup and fetch:', error);
    }
}

setupAndFetchTotalMovies();

export { createStoredProcedure, getTotalMovies };