import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from './api.routes'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.use('/api', apiRoutes)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});