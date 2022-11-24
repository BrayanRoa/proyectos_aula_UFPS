import { Request, Response } from "express";
import { File } from "../interfaces/file-upload.interface";
import { 
    updatePersona } from "../services/persona.service";


const actualizarPersona = async (req:Request, res:Response)=>{
    try {
        const file = req.files?.archivo as unknown as File
        //* TODO: CREO QUE PUEDO SACAR ESTA VALIDACIÓN DE AQUÍ
        if(req.persona.codigo !== req.params.codigo){
            return res.status(401).json({
                msg:`No puede realizar esta acción - No tiene los permisos necesarios`
            })
        }
        const {correo_institucional, codigo, ...persona} = req.body
        const update = await updatePersona(persona, req.params.codigo, file);

        res.status(200).json({
            update:(update[0] === 1)
                ?`Datos actualizados correctamente`
                :`No se actualizo ningún campo`
        })
       
    } catch (error:any) {
        res.status(400).json({
            err:error.messsage
        })
    }
}


export { 
    actualizarPersona,
 }