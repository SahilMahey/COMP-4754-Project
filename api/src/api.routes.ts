import express from 'express'

import movieRoutes from './movies/route'
import userRoutes from './users/route'
import searchRoutes from './search/routes'
import votesRoutes from './ratings/routes'
import popularityRoutes from './popularity/routes'

const router = express.Router()

router.use('/movies', movieRoutes)
router.use('/users', userRoutes)
router.use('/search', searchRoutes)
router.use('/votes', votesRoutes)
router.use('/popularity', popularityRoutes)



export default router