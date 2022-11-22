import { sequelize } from "../db/conexion";
import { validarArchivo } from "../helpers/validar-files";
import { File } from "../interfaces/file-upload.interface";
import { InscribirMateria } from "../interfaces/materia-response.interface";
import path from "path";
import readXlsxFile from "read-excel-file/node";
// import { ProfesorGrupo, PersonaResponse } from '../interfaces/persona-response.interface';
import Persona from "../db/models/Persona";
import Grupo from "../db/models/Grupo";
import { PersonaResponse } from "../interfaces/persona-response.interface";

const postMateria = async (materia: InscribirMateria, correo: string) => {
  await sequelize.query("CALL Add_Materia_Grupo_Persona(?,?,?,?,?)", {
    replacements: [
      materia.nombre,
      materia.cantidad_alumnos,
      correo,
      materia.cod_asignatura,
      materia.nombreGrupo,
    ],
  });
};

const postExcelAlumnos = async (file: File, materia: string, grupo:string):Promise<string[]> => {
  const nombreArchivo = await validarArchivo(file);
  const pathArchivo = path.join(__dirname, "../uploads/", nombreArchivo);
  let logs:string[] = []
  
  await readXlsxFile(pathArchivo).then(async (rows) => {
    rows.shift();

    for (const alumno of rows) {
      const [existeAlumno, existeAlumnoEnMateria] = await existeAlumnoEnSistema(alumno[0].toString(), materia)
      
      const estudiante:PersonaResponse = {
        correo_institucional: alumno[0].toString(),
        nombres: alumno[1].toString(),
        apellidos: alumno[2].toString(),
        cod_rol: 2,
        codigo: alumno[3].toString(),
        perfil_completado: false
      }

      if(!existeAlumno) await Persona.create({...estudiante})
      if(!existeAlumnoEnMateria){
        await sequelize.query("CALL Materia_Grupo_Estudiante(?,?,?)", {
          replacements: [estudiante.correo_institucional, grupo, materia],
        });
      }else{
        logs.push(`El estudiante ${estudiante.nombres} ${estudiante.apellidos} ya se encuentra registrado en otro grupo de esta materia`)
      }
    }
  });
  return logs
};

const existeAlumnoEnSistema = async (correo_institucional: string, materia:string):Promise<boolean[]> => {

  const [existeAlumno, existeAlumnoEnMateria] = await Promise.all([
    Persona.findByPk(correo_institucional),
    Persona.findAll({
      where: { cod_rol: 2, correo_institucional },
      include: [
        {
          model: Grupo,
          required: true,
          where: { cod_asignatura: materia },
          through: {
            attributes: [],
          },
        },
      ],
    })
  ])
  console.log(existeAlumnoEnMateria)

  return [
    existeAlumno ? true : false, 
    existeAlumnoEnMateria.length === 0?false:true
  ];
};

export { postMateria, postExcelAlumnos };
