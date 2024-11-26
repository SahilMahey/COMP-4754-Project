import db from '../src/db'

function formatDate(dateStr: string): Date | null {
    if (dateStr.includes('-')) {
        const [day, month, year] = dateStr.split('-').map(num => parseInt(num, 10));
        if (day && month && year) {
            return new Date(year, month - 1, day);
        }
    }

    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
}

async function insertMovieData(movieData: any) {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        for (const movie of movieData) {
            // 1. Insert movie and get its ID
            const movieQuery = `
                    INSERT INTO movies (
                        title, homepage, original_language, overview,
                        popularity, poster_path, release_date, runtime,
                        status, vote_average, type
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                    RETURNING id
                `;

            const movieValues = [
                movie.original_title,
                movie.homepage,
                movie.original_language,
                movie.overview,
                parseFloat(movie.popularity) || 0,
                movie.poster_path,
                movie.release_date ? formatDate(movie.release_date) : null,
                parseInt(movie.runtime) || null,
                movie.status,
                parseFloat(movie.vote_average) || null,
                movie.type
            ];


            const movieResult = await client.query(movieQuery, movieValues);
            const movieId = movieResult.rows[0].id;

            // 2. Handle genres
            const genres = (movie['genres'] || movie.genres || '').split(',').map((g: any) => g.trim()).filter((g: any) => g);
            for (const genre of genres) {
                // Insert genre if it doesn't exist
                const genreQuery = `
                        INSERT INTO genres (name)
                        VALUES ($1)
                        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
                        RETURNING id
                    `;
                const genreResult = await client.query(genreQuery, [genre]);
                const genreId = genreResult.rows[0].id;

                // Link movie and genre
                await client.query(
                    'INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                    [movieId, genreId]
                );
            }

            // 3. Handle production companies
            const companies = (movie.production_companies || '').split(',').map((c: any) => c.trim()).filter((c: any) => c);
            for (const company of companies) {
                const companyQuery = `
                        INSERT INTO production_companies (name)
                        VALUES ($1)
                        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
                        RETURNING id
                    `;
                const companyResult = await client.query(companyQuery, [company]);
                const companyId = companyResult.rows[0].id;

                await client.query(
                    'INSERT INTO movie_production_companies (movie_id, company_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                    [movieId, companyId]
                );
            }

            // 4. Handle actors
            const actors = (movie.actor_names || '').split(',').map((a: any) => a.trim()).filter((a: any) => a);
            for (const actor of actors) {
                const actorQuery = `
                        INSERT INTO actors (name)
                        VALUES ($1)
                        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
                        RETURNING id
                    `;
                const actorResult = await client.query(actorQuery, [actor]);
                const actorId = actorResult.rows[0].id;

                await client.query(
                    'INSERT INTO movie_actors (movie_id, actor_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                    [movieId, actorId]
                );
            }
        }

        await client.query('COMMIT');
        console.log(`Inserted ${movieData.length} movies and their related data`);

    } catch (error) {
        await client.query('ROLLBACK');
        console.log('Error: ', error)
        throw error;
    } finally {
        client.release();
    }

    await db.end();
    return movieData;
}
export { insertMovieData }