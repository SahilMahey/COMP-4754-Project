// createTrigger.ts

import db from '../src/db'; // Ensure you import the db connection

// Function to create the trigger
export async function createTrigger() {
    const createFunctionQuery = `
        CREATE OR REPLACE FUNCTION update_movie_popularity()
        RETURNS TRIGGER AS $$
        BEGIN
            UPDATE movies
            SET popularity = popularity + 1
            WHERE id = NEW.movie_id;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `;

    const createTriggerQuery = `
        CREATE TRIGGER movie_popularity_trigger
        AFTER INSERT ON user_bookmarks
        FOR EACH ROW
        EXECUTE FUNCTION update_movie_popularity();
    `;

    // Run the SQL queries to create the function and trigger
    await db.query(createFunctionQuery);
    await db.query(createTriggerQuery);

    console.log("Trigger and function created successfully");
}
