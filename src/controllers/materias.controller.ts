import { Request, Response } from "express";
import { postMateria } from "../services/materias.service";


const registroMateria =  async(req:Request, res:Response)=>{
    try {
        const regMateria = await postMateria(req.body, req.uid)
        res.status(201).json({
            regMateria
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
}

export {registroMateria}