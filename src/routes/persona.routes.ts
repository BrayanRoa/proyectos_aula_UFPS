import { Router } from 'express'
import { findAll } from '../controllers/ejemplo.controller'

const router = Router()

router.get('/', findAll)

// router.post('/')

export default router
