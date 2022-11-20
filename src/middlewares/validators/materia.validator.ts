import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import {
  existeAsignatura,
  existeGrupo,
  puedoAgregarGrupoMateria,
} from "../../helpers/db-validators";
import { validarCampos } from "../validar-campos";

//* TODO: FALTA VALIDAR QUE SEA UN PROFESOR
export const validarMateria = [
  check("cod_asignatura").custom((cod) => existeAsignatura(cod, "materia")),
  check("nombreGrupo").custom((nomGrupo) => existeGrupo(nomGrupo, "materia")),
  (req: Request, res: Response, next: any) => {
    validarCampos(req, res, next);
  },
];

//* TODO: VALIDAR QUE SEA DOCENTE QUIEN CREA EL GRUPO
export const registroGrupo = [
  check("cod_asignatura").custom((asignatura) =>
    puedoAgregarGrupoMateria(asignatura)
  ),
  check("nombre").custom((grupo) => existeGrupo(grupo, "grupo")),
  (req: Request, res: Response, next: NextFunction) => {
    validarCampos(req, res, next);
  },
];
