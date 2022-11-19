import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import {
  existeCodigo,
  existeCorreoInstitucional,
  existeAsignatura,
  existeGrupo,
} from "../../helpers/db-validators";
import { validarCampos } from "../validar-campos";

const crearProfesor = [
  check("nombres", "Los nombres son requeridos").not().isEmpty(),
  check("apellidos", "Los apellidos son requeridos").not().isEmpty(),
  check("correo_institucional").custom((correo_int) =>
    existeCorreoInstitucional(correo_int)
  ),
  check("codigo").custom((codigo) => existeCodigo(codigo)),
  check("cod_rol", "el rol es requerido").notEmpty(),
  check("materia").custom((asignatura) => existeAsignatura(asignatura)),
  check("grupo").custom((grupo: string) => existeGrupo(grupo)),
  (req: Request, res: Response, next: NextFunction) => {
      validarCampos(req, res, next);
  },
];

export { crearProfesor };
