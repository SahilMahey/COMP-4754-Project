import dotenv from 'dotenv'

dotenv.config()
export function getEnv(variable: string) {
    const env = process.env[variable];
    if (!env) {
        throw new Error(`Add ${variable} to .env`)
    }
    return env
}