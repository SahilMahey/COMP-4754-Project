const bcrypt = require("bcrypt");
const pool = require("./db").default;

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        try {
            // Check if the user already exists
            const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (userExists.rows.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the user into the database
            await pool.query("INSERT INTO Users (name, email, password) VALUES ($1, $2, $3)", [
                name,
                email,
                hashedPassword,
            ]);

            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
