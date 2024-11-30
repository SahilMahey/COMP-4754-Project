import express from "express";
import recommendationController from "./controller";

const router = express.Router();

router.get("/recommendations", recommendationController.getRecommendations);

export default router;
