import { sequelize } from "../db/conexion";
import { InscribirMateria, GrupoResponse } from '../interfaces/materia-response.interface';
import Grupo from '../db/models/Grupo';
import Asignatura from "../db/models/Asignatura";
import Persona from '../db/models/Persona';

const postMateria = async (materia: InscribirMateria, correo:string) => {
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

const postGrupo = async (grupo:GrupoResponse):Promise<Grupo>=>{
    const addGrupo = await Grupo.create({...grupo})
    return addGrupo
}

const getMaterias = async()=>{
    const materias = await Asignatura.findAll({
      include:[{
        model:Grupo,
        required:true,
        attributes:['nombre', 'cod_grupo']
      }]
    })
    return materias
}


//* ⚠️ FUNCIONA BIEN PERO ME DA MUCHOS DATOS, ACOMODAR LA SALIDA
const getAlumnos = async(materia:string, grupo:string)=>{
    const alumnos = await Asignatura.findAll({
      where:{cod_asignatura:materia},
      include:[{
        model:Grupo,
        attributes:['cod_grupo','nombre'],
        where:{nombre:grupo},
        include:[{
          model:Persona,
          attributes:['nombres', 'apellidos', 'codigo', 'correo_institucional'],
          required:true,
          through:{
            attributes:[]
          }
        }]
      }]
    })
    return alumnos
}

export { postMateria, postGrupo, getMaterias, getAlumnos };
