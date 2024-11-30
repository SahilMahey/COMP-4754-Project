import db from '../src/db';

async function createView() {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const createViewQuery = `
            CREATE OR REPLACE VIEW user_bookmarks AS
            SELECT 
                b.id AS bookmark_id,         
                u.id AS user_id,             
                u.name AS user_name,         
                u.email AS user_email   
            FROM 
                bookmarks b
            JOIN 
                users u 
            ON 
                b.user_id = u.id;
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

    await db.end();
}

export { createView };
