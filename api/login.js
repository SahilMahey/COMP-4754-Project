import bcrypt from "bcrypt";
const pool = require("./db").default;

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            // Fetch the user from the database
            const userResult = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
            const user = userResult.rows[0];

            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Simulate session by sending success response
            res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
