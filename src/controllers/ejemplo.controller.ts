/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express'

const findAll = (_req: Request, res: Response) => {
  //* AQUI LLAMAR A LOS SERVICIOS PERTINENTES
  try {
    res.status(200).json({
      msg: 'ok'
    })
  } catch (error) {
    return res.status(400).json({
      msg: error
    })
  }
}

const findByID = async (_req: Request, _res: Response) => {
  return undefined
}

const create = async (_req: Request, _res: Response) => {
  return undefined
}

const update = async (_req: Request, _res: Response) => {
  return undefined
}

const remove = async (_req: Request, _res: Response) => {
  return undefined
}

export {
  findAll, findByID, create, update, remove
}
