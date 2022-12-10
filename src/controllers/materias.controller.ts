import { Request, Response } from "express";

import { 
    getAlumnos, 
    getAlumnosProyecto, 
    getListadoProyectos, 
    getMaterias, 
    postAlumno, 
    postAlumnoProyecto, 
    postExcelAlumnos, 
    postGrupo, 
    postMateria, 
    postProyecto} from "../services/materias.service";

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
        res.status(400).json({
            error:error.message
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
        const { cod_asignatura, nombreGrupo } = req.params
        const asignatura = await getAlumnos(cod_asignatura, nombreGrupo);
        res.status(200).json({
            alumnos:(asignatura.length === 0)
                ?`No hay alumnos en la materia ${cod_asignatura}`
                :asignatura
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
}

const registrarProyecto = async(req:Request, res:Response)=>{
    try {
        const { asignatura, grupo } = req.params
        const proyecto = req.body
        await postProyecto(asignatura, grupo, proyecto)
        res.status(201).json({
            msg:`Proyecto agregado con exito!!!`
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
}

const obtenerAlumnosProyecto = async (req:Request, res:Response)=>{
    try {
        const { asignatura, grupo, cod_proyecto } = req.params
        const alumnosProyecto = await getAlumnosProyecto(asignatura, grupo, +cod_proyecto)

        res.status(200).json({
            personas:(alumnosProyecto.length === 0)
                ?`No hay alumnos asignados al proyecto`
                :alumnosProyecto
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
}

const registroPersonaProyecto = async (req:Request, res:Response)=>{
    try {
        const { cod_proyecto, cod_asignatura, grupo } = req.body
        const { correo_institucional } = req.persona
        await postAlumnoProyecto(cod_proyecto, correo_institucional, cod_asignatura, grupo)

        res.status(200).json({
            msg:`Persona registrada con exito en el proyecto`
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message
        })
    }
}

const obtenerListadoProyectos = async(req:Request, res:Response)=>{
    try {
        const { cod_asignatura, nombreGrupo } = req.params
        const proyectos = await getListadoProyectos(cod_asignatura, nombreGrupo)

        res.status(200).json({
            proyectos:(proyectos.length === 0)
                ?`No hay proyectos en la materia ${cod_asignatura}`
                :proyectos
        })
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
    registroAlumno,
    registrarProyecto,
    obtenerAlumnosProyecto,
    registroPersonaProyecto,
    obtenerListadoProyectos
}
