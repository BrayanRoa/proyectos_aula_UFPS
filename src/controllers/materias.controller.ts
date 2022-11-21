import { Request, Response } from "express";
import { getAlumnos, getMaterias, postGrupo, postMateria } from "../services/materias.service";


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

const registrarGrupo = async(req:Request, res:Response)=>{
    try {
        const resGrupo = await postGrupo(req.body)
        res.status(201).json({
            resGrupo
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
}

const obtenerMaterias = async(_req:Request, res:Response)=>{
    try {
        const materias = await getMaterias();
        res.status(200).json({
            materias
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
}

const obtenerAlumnosMateriaGrupo = async(req:Request, res:Response)=>{
    try {
        const { materia, grupo } = req.params
        const asignatura = await getAlumnos(materia, grupo);
        res.status(200).json(...asignatura)
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
}

export {registroMateria, registrarGrupo, obtenerMaterias, obtenerAlumnosMateriaGrupo}