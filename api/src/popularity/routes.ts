import express from "express";
import movieController from "./controller";

const router = express.Router();

router.get('/', movieController.get_top_10_popularity);

export default router;
