import { Request, Response } from "express"
import { User } from './model'
import db from '../db'

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await db.query(
            `SELECT id FROM users WHERE email = $1`,
            [email]
        )

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            })
        }

        const result = await db.query(
            `INSERT INTO users (name, email, password) 
             VALUES ($1, $2, $3) 
             RETURNING id, name, email`,
            [name, email, password]
        )

        const user: User = result.rows[0]

        res.status(200).json({
            success: true,
            message: 'User created',
            data: user
        })

    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const result = await db.query(
            `SELECT id, name, email, password 
             FROM users 
             WHERE email = $1`,
            [email]
        )

        const user = result.rows[0]

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        delete user.password

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: user
        })

    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error
        })
    }
}

export default { createUser, loginUser }