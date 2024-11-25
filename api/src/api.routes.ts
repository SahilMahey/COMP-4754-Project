import express from 'express'
import cors from "cors";  // Import cors package

import movieRoutes from './movies/routes'
import searchRoutes from './search/routes'
import votesRoutes from './ratings/routes'
import popularityRoutes from './popularity/routes'
const router = express.Router()
router.use(cors());

router.use('/movies', movieRoutes)
router.use('/search', searchRoutes)
router.use('/votes', votesRoutes)
router.use('/popularity', popularityRoutes)



export default router