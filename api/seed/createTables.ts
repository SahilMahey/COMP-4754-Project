import db from '../src/db'
async function createTables() {
    const queries = [
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS user_bookmarks (
            user_id INTEGER,
            movie_id INTEGER,
        )`,
        // Movies table (main table)
        `CREATE TABLE IF NOT EXISTS movies (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            homepage TEXT,
            original_language TEXT,
            overview TEXT,
            popularity NUMERIC,
            poster_path TEXT,
            release_date DATE,
            runtime INTEGER,
            status TEXT,
            vote_average NUMERIC,
            type TEXT
        )`,

        // Genres table
        `CREATE TABLE IF NOT EXISTS genres (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE NOT NULL
        )`,

        // Movie-Genre junction table
        `CREATE TABLE IF NOT EXISTS movie_genres (
            movie_id INTEGER REFERENCES movies(id),
            genre_id INTEGER REFERENCES genres(id),
            PRIMARY KEY (movie_id, genre_id)
        )`,

        // Production Companies table
        `CREATE TABLE IF NOT EXISTS production_companies (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE NOT NULL
        )`,

        // Movie-Production Companies junction table
        `CREATE TABLE IF NOT EXISTS movie_production_companies (
            movie_id INTEGER REFERENCES movies(id),
            company_id INTEGER REFERENCES production_companies(id),
            PRIMARY KEY (movie_id, company_id)
        )`,

        // Actors table
        `CREATE TABLE IF NOT EXISTS actors (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE NOT NULL
        )`,

        // Movie-Actors junction table
        `CREATE TABLE IF NOT EXISTS movie_actors (
            movie_id INTEGER REFERENCES movies(id),
            actor_id INTEGER REFERENCES actors(id),
            PRIMARY KEY (movie_id, actor_id)
        )`
    ];

    for (const query of queries) {
        await db.query(query);
    }
}
export { createTables }