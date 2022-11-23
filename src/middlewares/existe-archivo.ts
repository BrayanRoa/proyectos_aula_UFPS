import { NextFunction, Request, Response } from "express";

// Generated by https://quicktype.io

// interface Files {
//     name:         string;
//     data:         Data;
//     size:         number;
//     encoding:     string;
//     tempFilePath: string;
//     truncated:    boolean;
//     mimetype:     string;
//     md5:          string;
// }

export interface Data {
    type: string;
    data: any[];
}

export const existeArchivo = (req:Request, res:Response, next:NextFunction)=>{
    // const extValidas = ['png','jpeg','jpg', 'csv', 'xlsx', 'xls']
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg:'No hay archivos en la petición.'
        });
    }

    //* 👀 PRIMERO DEBO CONVERTIRLO A UNKNOWN (DESCONOCIDO) PARA DESPUES ASIGNARLE UN TIPO
    //* 📓 https://garbagevalue.com/blog/typescript-custom-to-primitive-type-casting
    // const {mimetype} = (req.files.archivo) as unknown as Files
    // const extension = mimetype.split('/')

    // if(!extValidas.includes(extension[1])){
    //     return res.status(400).json({
    //         msg:`Extensión del archivo no válida - validas ${extValidas}`
    //     })
    // }
    next()
}