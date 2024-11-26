import express from 'express'
import movieController from './controller'

const router = express.Router()

router.get('/', movieController.searchMovies)

export default router