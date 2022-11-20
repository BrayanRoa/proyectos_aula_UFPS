import { Router } from "express";
import { obtenerAlumnosMateriaGrupo, obtenerMaterias, registrarGrupo, registroMateria } from "../controllers/materias.controller";
import { validarMateria, registroGrupo } from '../middlewares/validators/materia.validator';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

//* ⚠️ VALIDAR QUE SEA DOCENTE
router.post('/',[validarJWT], validarMateria, registroMateria)

//* ⚠️ VALIDAR QUE SEA DOCENTE
router.post('/grupo', registroGrupo, registrarGrupo)

router.get('/',[validarJWT], obtenerMaterias);

router.get('/:materia/:grupo', obtenerAlumnosMateriaGrupo)

export default router;
