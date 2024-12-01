import db from '../src/db';

async function createBookmarkView() {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const createViewQuery = `
        CREATE OR REPLACE VIEW user_bookmarks_view AS
        SELECT 
            ub.user_id,
            ub.movie_id,
            u.name AS user_name,
            u.email AS user_email
        FROM 
            user_bookmarks ub
        JOIN 
            users u 
        ON 
            ub.user_id = u.id;
    `;

        // Execute the CREATE VIEW query
        await client.query(createViewQuery);

        await client.query('COMMIT');
        console.log('View "user_bookmarks" created successfully!');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating the view:', error);
        throw error;
    } finally {
        client.release();
    }

}

export { createBookmarkView };
