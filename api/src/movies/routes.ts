import express from 'express'
import movieController from './controller'

const router = express.Router()

router.get('/', movieController.getMovies)

export default router