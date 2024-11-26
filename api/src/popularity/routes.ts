import movieController from './controller'
import express from 'express'
const router = express.Router()

router.get('/', movieController.get_top_10_popularity)

export default router