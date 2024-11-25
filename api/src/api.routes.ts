import express from 'express'
import movieRoutes from './movies/route'
import userRoutes from './users/route'

const router = express.Router()

router.use('/movies', movieRoutes)
router.use('/users', userRoutes)

export default router