import { Request, Response } from "express";
import { loginPersona, postProfesor } from "../services/auth.service";

const login = async (req: Request, res: Response) => {
  const { correo_institucional } = req.params;
  try {
    const [persona, token] = await loginPersona(correo_institucional);
    res.status(200).json({
      persona,
      token,
    });
  } catch (error:any) {
    res.status(400).json({
      err:error.message,
    });
  }
};

const registroProfesor = async (req: Request, res: Response)=>{
    try {
        // const { materia, grupo, ...persona } = req.body
        const registrar = await postProfesor(req.body)
        return res.status(201).json({
            registrar
        })
    } catch (error:any) {
        res.status(400).json({
            err:error.message,
        })
    }
}

export { login, registroProfesor };
