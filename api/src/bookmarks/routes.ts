import express, { RequestHandler } from 'express'
import bookMarkController from './controller'

const router = express.Router()

router.get('/', bookMarkController.addMovieToBookMarks)

export default router