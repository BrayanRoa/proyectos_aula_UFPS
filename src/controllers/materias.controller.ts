import { Request, Response } from "express";
import { File } from "../interfaces/file-upload.interface";
import { postExcelAlumnos, postMateria } from "../services/materias.service";


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

const registrarExcelAlumnos = async (req:Request, res:Response)=>{
    try {
        const file = req.files?.archivo as unknown as File
        const { asignatura, grupo } = req.params
        
        const registro = await postExcelAlumnos(file, asignatura, grupo)

        res.status(201).json({
            registro:(registro.length === 0)?`Registro exitoso`:registro
        })
        
    } catch (error:any) {
        res.status(400).json({
            err:error.message
        })
    }
}



export {registroMateria, registrarExcelAlumnos}