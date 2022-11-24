import { Request, Response, NextFunction } from "express";
import { check, param } from "express-validator";
import {
  existeAsignatura,
  existeGrupo,
  puedoAgregarGrupoMateria,
} from "../../helpers/db-validators";
import { validarCampos } from "../validar-campos";

export const validarMateria = [
  check("cod_asignatura").custom((cod) => existeAsignatura(cod, "materia")),
  check("nombreGrupo").custom((nomGrupo) => existeGrupo(nomGrupo, "materia")),
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

// export const validarRegistroAlumno = [
//   check("nombres", "Los nombres son requeridos").not().isEmpty(),
//   check("apellidos", "Los apellidos son requeridos").not().isEmpty(),
//   check("correo_institucional").custom((correo_int) =>
//     existeCorreoInstitucional(correo_int)
//   ),
//   check("codigo").custom((codigo) => existeCodigo(codigo)),
//   check("cod_rol", "el rol es requerido").notEmpty(),
//   (req: Request, res: Response, next: NextFunction) => {
//     validarCampos(req, res, next);
//   },
// ]
