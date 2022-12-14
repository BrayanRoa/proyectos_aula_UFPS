import { Router } from "express";

import {
  obtenerAlumnosMateriaGrupo,
  obtenerAlumnosProyecto,
  obtenerListadoProyectos,
  obtenerMaterias,
  registrarExcelAlumnos,
  registrarGrupo,
  registrarProyecto,
  registroAlumno,
  registroMateria,
  registroPersonaProyecto,
} from "../controllers/materias.controller";

import {
  validarMateria,
  registroGrupo,
  validarExcelEstudiantes,
  validarRegistroProyecto,
  existeAlumnosProyecto,
  existeMateriaGrupo,
  codigoPersona
} from "../middlewares/validators/materia.validator";

import { validarJWT } from "../middlewares/validar-jwt";
import { existeArchivo } from "../middlewares/existe-archivo";
import { validarRolDocente } from "../middlewares/validar-campos";

const router = Router();

//** SOLO DOCENTES Y NECESITA PASARLE UN JWT */
//* TODO: ME PARECE MEJOR INSCRIBIR LA MATERIA Y DEJAR OTRO ENLACE PARA ASIGNARLE PROFESOR
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

//* TODO: DEBERIA HACER UNA RUTA DONDE EL ALUMNO SOLO PUEDA VER EL LISTADO DE SUS MATERIAS */

//* TODO: SOLO PUEDEN VER LA LISTA LOS DOCENTES? O TAMBIEN DEBERIA DEJARLO PARA QUE TODOS VEAN EL LISTADO DE ESTUDIATES */
router.get(
  "/:cod_asignatura/:nombreGrupo",
  [validarJWT],
  existeMateriaGrupo,
  obtenerAlumnosMateriaGrupo
);

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
  codigoPersona,
  registroAlumno
);

//* 👀  FUNCIONA PERO DEBO HACER MAS PRUEBAS Y ACOMODAR LA CONSULTA PREPARADA
router.post(
  "/proyectos/:asignatura/:grupo",
  [validarJWT, validarRolDocente],
  validarRegistroProyecto,
  registrarProyecto
);

//* OBTENER LOS ALUMNOS REGISTRADOS EN UN PROYECTO
router.get(
  "/proyectos/:asignatura/:grupo/:cod_proyecto",
  [validarJWT],
  existeAlumnosProyecto,
  obtenerAlumnosProyecto
);

router.get(
  "/proyectos/:cod_asignatura/:nombreGrupo",
  [validarJWT],
  existeMateriaGrupo,
  obtenerListadoProyectos
);

//* REGISTRAR PERSONA EN PROYECTO
// TODO: DEBERIA COLOCARLE UN ESTADO A LA TABLA PERSONA_PROYECTO? ESTO PARA SABER SI UNA PERSONA SIGUE EN EL PROYECTO O SI SE SALIO
router.post(
  "/proyectos/registrarAlumno",
  [validarJWT],
  existeMateriaGrupo,
  registroPersonaProyecto
);

export default router;
