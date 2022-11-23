import { File } from "../interfaces/file-upload.interface";

const path = require('path') 
const { v4: uuidv4} = require('uuid')
uuidv4();

export const validarArchivo =(archivo:File, extValidas = ['csv', 'xlsx', 'xls']):Promise<string>=>{

    return new Promise((resolve, reject)=>{
        // const { archivo } = file;

        const nombreCortado = archivo.name.split('.');
    
        const extension = nombreCortado[nombreCortado.length-1];
    
        if(!extValidas.includes(extension)){
            return reject(`Extension ${extension} no es válida - ${extValidas} -> Permitidas`)
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

        archivo.mv(uploadPath, (err:any)=>{
            if(err){
                reject(err)
            }
            resolve(nombreTemp)
        })
    })
    
}

