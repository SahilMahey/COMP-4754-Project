import express, { RequestHandler } from 'express'
import bookMarkController from './controller'

const router = express.Router()

router.post('/add', bookMarkController.addMovieToBookMarks)
router.get('/:userId/records', bookMarkController.retrieveUserBookMarks)

export default router