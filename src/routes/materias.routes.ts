import { Router } from "express";
import { registrarExcelAlumnos, registroMateria } from "../controllers/materias.controller";
import { validarExcelEstudiantes, validarMateria } from '../middlewares/validators/materia.validator';
import { validarJWT } from '../middlewares/validar-jwt';
import { existeArchivo } from '../middlewares/existe-archivo';

const router = Router();

//* ⚠️ VALIDAR QUE SEA DOCENTE
router.post('/',[validarJWT], validarMateria, registroMateria)

//* ⚠️ VALIDAR QUE SEA DOCENTE QUIEN REGISTRA ALUMNOS
router.post('/registroAlumnos/:asignatura/:grupo',[validarJWT, existeArchivo], validarExcelEstudiantes, registrarExcelAlumnos)

//* 👀 YA HICE BUSCAR ALUMNOS POR MATERIA Y GRUPO?

export default router;
