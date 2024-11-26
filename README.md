## Setup Database

Install pgAdmin
Create your database in pgAdmin

Add to .env:
DATABASE_NAME = ""
DATABASE_PASSWORD = ""

## Seed process

To seed database with the `movie.csv` data

Run
`cd api`

`npm install`

`npx ts-node ./seed/seed_db.ts ./seed/movie.csv`

To run express server `npm run dev`
