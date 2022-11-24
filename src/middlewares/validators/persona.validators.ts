import { param } from 'express-validator';
import { existeCodigo } from '../../helpers/db-validators';
import { Request, Response, NextFunction } from "express";
import { validarCampos } from '../validar-campos';

const validarPersona = [
    param('codigo').custom(cod => existeCodigo(cod, 'actualizarPersona')),
    (req:Request, res:Response, next:NextFunction)=>{
        validarCampos(req, res, next)
    }
]

export { validarPersona }