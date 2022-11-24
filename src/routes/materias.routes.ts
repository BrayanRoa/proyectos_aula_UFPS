import { Router } from "express";

import {
  obtenerAlumnosMateriaGrupo,
  obtenerMaterias,
  registrarExcelAlumnos,
  registrarGrupo,
  registrarProyecto,
  registroAlumno,
  registroMateria,
} from "../controllers/materias.controller";

import {
  validarMateria,
  registroGrupo,
  validarExcelEstudiantes,
  validarRegistroProyecto,
} from "../middlewares/validators/materia.validator";

import { validarJWT } from "../middlewares/validar-jwt";
import { existeArchivo } from "../middlewares/existe-archivo";
import { validarRolDocente } from "../middlewares/validar-campos";

const router = Router();

//** SOLO DOCENTES Y NECESITA PASARLE UN JWT */
router.post(
  "/",
  [validarJWT, validarRolDocente], //👮
  validarMateria,
  registroMateria
);

//** SOLO DOCENTES Y NECESITA PASARLE UN JWT */
router.post(
  "/grupo",
  [validarJWT, validarRolDocente], //👮
  registroGrupo,
  registrarGrupo
);

//** AQUI SON TODAS LAS MATERIAS QUE HAY EN EL SISTEMA, SOLO DOCENTES CON UN JWT VÁLIDO */
router.get("/", [validarJWT, validarRolDocente], obtenerMaterias);

//** TODO: DEBERIA HACER UNA RUTA DONDE EL ALUMNO SOLO PUEDA VER EL LISTADO DE SUS MATERIAS */

//** TODO: SOLO PUEDEN VER LA LISTA LOS DOCENTES? O TAMBIEN DEBERIA DEJARLO PARA QUE TODOS VEAN EL LISTADO DE ESTUDIATES */
router.get("/:materia/:grupo", [validarJWT], obtenerAlumnosMateriaGrupo);

//** SE REGISTRA EL LISTADO DE ALUMNOS, SOLO LO PUEDE HACER UN DOCENTE */
router.post(
  "/registroAlumnos/:asignatura/:grupo",
  [validarJWT, validarRolDocente, existeArchivo],
  validarExcelEstudiantes,
  registrarExcelAlumnos
);

//** 👀 LA RUTA ES EN SINGULAR, PARA REGISTRAR UN SOLO ALUMNO EN LA MATERIA */
router.post(
  "/registroAlumno/:materia/:grupo",
  [validarJWT, validarRolDocente],
  registroAlumno
);

//* 👀 FUNCIONA PERO DEBO HACER MAS PRUEBAS Y ACOMODAR LA CONSULTA PREPARADA
//* FIXME: VALIDAR QUE NO EXISTA YA EL PROYECTO QUE VOY A REGISTRAR
router.post(
  "/proyectos/:asignatura/:grupo",
  [validarJWT, validarRolDocente],
  validarRegistroProyecto,
  registrarProyecto
);

export default router;
