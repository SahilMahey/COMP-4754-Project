import express, { RequestHandler } from "express";
import userController from './controller'

const router = express.Router()

router.post('/signup', userController.createUser as RequestHandler)
router.post('/login', userController.loginUser as RequestHandler)
router.get("/profile", userController.getProfile as RequestHandler);
router.put('/update-name', userController.updateUserName as RequestHandler);
export default router
