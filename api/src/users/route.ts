import express, { RequestHandler } from "express";
import userController from './controller'

const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.loginUser as RequestHandler)

export default router
