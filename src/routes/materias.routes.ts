import { Router } from "express";
import { registroMateria } from "../controllers/materias.controller";
import { validarMateria } from '../middlewares/validators/materia.validator';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

//* ⚠️ VALIDAR QUE SEA DOCENTE
router.post('/',[validarJWT], validarMateria, registroMateria)

export default router;
