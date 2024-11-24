import { Pool } from 'pg'
import dotenv from 'dotenv'
import { getEnv } from './getEnv'

dotenv.config()
const credentials = {
    user: getEnv('DATABASE_NAME'),
    host: 'localhost',
    password: getEnv('DATABASE_PASSWORD'),
    port: 5432
}

const pool = new Pool(credentials)

export default pool