import { Request, Response, NextFunction } from "express";
import { check, param } from "express-validator";
import {
  existeAsignatura,
  existeGrupo,
  puedoAgregarGrupoMateria,
  existeProyecto,
  existeCodigo
} from "../../helpers/db-validators";
import { validarCampos } from "../validar-campos";

export const validarMateria = [
  check("cod_asignatura").custom((cod) => existeAsignatura(cod, "materia")),
  check("nombreGrupo").custom((nomGrupo) => existeGrupo(nomGrupo, "materia")),
  check("nombre", "El nombre de la materia es obligatorio").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validarCampos(req, res, next);
  },
];

export const registroGrupo = [
  check("cod_asignatura").custom((asignatura) =>
    puedoAgregarGrupoMateria(asignatura)
  ),
  check("nombre").custom((grupo) => existeGrupo(grupo, "grupo")),
  (req: Request, res: Response, next: NextFunction) => {
    validarCampos(req, res, next);
  },
];

export const validarExcelEstudiantes = [
  param('asignatura').custom((cod)=> puedoAgregarGrupoMateria(cod)),
  param('grupo').custom((grupo)=> existeGrupo(grupo)),
  (req: Request, res: Response, next: NextFunction) => {
    validarCampos(req, res, next);
  },
]

export const validarRegistroProyecto = [
  param('asignatura').custom(cod => existeAsignatura(cod)),
  param('grupo').custom(grupo => existeGrupo(grupo)),
  check('nombres').custom(proyecto => existeProyecto(proyecto, 'registro')),
  (req: Request, res: Response, next: NextFunction) => {
    validarCampos(req, res, next);
  },
]

export const existeAlumnosProyecto = [
  param('asignatura').custom(cod => existeAsignatura(cod)),
  param('grupo').custom(grupo => existeGrupo(grupo)),
  param('cod_proyecto').custom(proyecto => existeProyecto(proyecto, 'busqueda')),
  (req: Request, res: Response, next: NextFunction) => {
    validarCampos(req, res, next);
  },
]

export const existeMateriaGrupo = [
  check("cod_asignatura").custom((cod) => existeAsignatura(cod)),
  check("nombreGrupo").custom((nomGrupo) => existeGrupo(nomGrupo)),
  (req: Request, res: Response, next: NextFunction) => {
    validarCampos(req, res, next);
  },
]

export const codigoPersona = [
  check('codigo').custom(codigo => existeCodigo(codigo)),
  (req: Request, res: Response, next: NextFunction) => {
    validarCampos(req, res, next);
  },
]

