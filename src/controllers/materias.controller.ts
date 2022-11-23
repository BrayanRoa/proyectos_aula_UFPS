import { Request, Response } from "express";

import { 
    getAlumnos, 
    getMaterias, 
    postAlumno, 
    postExcelAlumnos, 
    postGrupo, 
    postMateria } from "../services/materias.service";

import { File } from "../interfaces/file-upload.interface";



const registroMateria =  async(req:Request, res:Response)=>{
    try {
        await postMateria(req.body, req.uid)
        res.status(201).json({
            msg:`Materia registrada con exito`
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

const registrarExcelAlumnos = async (req:Request, res:Response)=>{
    try {
        const file = req.files?.archivo as unknown as File
        const { asignatura, grupo } = req.params
        
        const registro = await postExcelAlumnos(file, asignatura, grupo)

        res.status(201).json({
            registro:(registro.length === 0)?`Registro exitoso`:registro
        })
        
    } catch (error:any) {
        console.log(error);
        res.status(400).json({
            err:error.message
        })
    }
}

const registroAlumno = async (req:Request, res:Response)=>{
    try {
        const { materia, grupo } = req.params
        const alumno = await postAlumno(req.body, materia, grupo)
        res.status(201).json({
            alumno:(alumno)
                ?`Alumno/a registrado/a con exito!!!`
                :`Este estudiante ya se encuentra registrado/a en otro grupo de esta materia`
        })
    } catch (error:any) {
        console.log(error);
        res.status(400).json({
            err:error.message
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

export {
    registroMateria, 
    registrarGrupo, 
    obtenerMaterias, 
    obtenerAlumnosMateriaGrupo, 
    registrarExcelAlumnos,
    registroAlumno}
