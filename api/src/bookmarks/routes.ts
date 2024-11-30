import express from "express";
import bookMarkController from "./controller";

const router = express.Router();

// POST route to add a movie to bookmarks
router.post("/bookmark", bookMarkController.addMovieToBookMarks);

// GET route to retrieve user's bookmarks
router.get("/bookmarks/:userId", bookMarkController.retrieveUserBookMarks);

export default router;
