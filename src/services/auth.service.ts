import { sequelize } from "../db/conexion";
import Persona from "../db/models/Persona";
import { generarJWT } from "../helpers/generar-jwt";
import {
  // PersonaResponse,
  ProfesorGrupo,
} from "../interfaces/persona-response.interface";
import Grupo from "../db/models/Grupo";

const loginPersona = async (correo_institucional: string) => {
  let persona = await Persona.findByPk(correo_institucional);

  if (!persona) {
    throw new Error(`No existe persona con correo ${correo_institucional}`);
  }

  const token = await generarJWT(correo_institucional, persona.cod_rol);
  return [persona, token];
};

const postProfesor = async (profesor: ProfesorGrupo): Promise<string> => {
  const { correo_institucional, grupo, materia } = profesor
  const existe = await existeProfesorEnGrupo(profesor)
  if (!existe) {
    await Persona.create({ ...profesor });
    await sequelize.query("CALL Materia_Grupo_Estudiante(?,?,?)", {
      replacements: [correo_institucional, grupo, materia],
    });
  }

  return existe 
    ? `Ya hay un docente asignado para el grupo ${profesor.grupo}  de la asignatura ${profesor.materia}`
    : `Docente registrado en la materia ${profesor.materia} grupo:${profesor.grupo}`
};

const existeProfesorEnGrupo = async (
  profesor: ProfesorGrupo
): Promise<boolean | null> => {
  const { materia, grupo, cod_rol } = profesor;

  const existe = await Persona.findAll({
    where: { cod_rol },
    include: [
      {
        model: Grupo,
        required: true,
        where: { cod_asignatura: materia, nombre: grupo },
        through: {
          attributes: [],
        },
      },
    ],
  });
  console.log({existe})
  return (existe.length === 0) ? false : true;
};

// const personaPorCorreo = async (correo: string): Promise<boolean> => {
//   const existe = await Persona.findByPk(correo);
//   return existe ? true : false;
// };

export { loginPersona, postProfesor };
