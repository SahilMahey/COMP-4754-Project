import csv from 'csvtojson/v2'
import { insertMovieData } from './insertMovies';
import { createTables } from './createTables';
import { createMovieTitleIndex } from './createIndexOnMovieTitle';
import { createBookmarkView } from './createBookmarkView';


async function seedDb(csvPath: string) {
    try {

        const jsonArray = await csv().fromFile(csvPath);

        console.log(`Processed ${jsonArray.length} records from CSV`);

        await createTables()
        await insertMovieData(jsonArray)
        await createBookmarkView()
        await createMovieTitleIndex()

        return jsonArray;
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
}

// Add main execution block
if (require.main === module) {
    let csvPath = process.argv[2];
    if (!csvPath) {
        console.error('Please provide a CSV file path as an argument');
        console.log('Using default path at ./movie.csv')
        csvPath = './movie.csv'
    }

    seedDb(csvPath)
        .then(data => console.log('Seeding completed successfully'))
        .catch(err => {
            console.error('Failed to seed database');
            process.exit(1);
        });
}

export default seedDb;