import { Router } from 'express'
import { login, registroProfesor } from '../controllers/auth.controller'
import { crearProfesor } from '../middlewares/validators/login.validator'
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router()

//* 🉑 INICIAR SESIÓN
router.post('/login', login)

//* ⚠️ VALIDAR QUE NO EXISTA YA ESA PERSONA EN LA BD
router.post('/registroProfesor',[validarJWT], crearProfesor, registroProfesor)

export default router