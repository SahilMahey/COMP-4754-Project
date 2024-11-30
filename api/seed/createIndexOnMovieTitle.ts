import db from '../src/db'

async function createMovieTitleIndex() {
    const query = `
        CREATE INDEX IF NOT EXISTS movies_title_idx 
        ON movies (title);
    `;

    try {
        await db.query(query);
        console.log('Successfully created index on movies.title');
    } catch (error) {
        console.error('Error creating index:', error);
        throw error;
    } finally {
        await db.end()
    }
}

export { createMovieTitleIndex }