/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  //* VALIDO SI HAY ERRORES A LA HORA DE RECIBIR LOS DATOS
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
}

export {
  validarCampos
}
