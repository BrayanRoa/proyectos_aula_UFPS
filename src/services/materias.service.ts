import { sequelize } from "../db/conexion";
import fs from "fs";
import path from "path";
import readXlsxFile from "read-excel-file/node";

import {
  InscribirMateria,
  GrupoResponse,
} from "../interfaces/materia-response.interface";
import Asignatura from "../db/models/Asignatura";

import { validarArchivo } from "../helpers/validar-files";
import { File } from "../interfaces/file-upload.interface";

import Persona from "../db/models/Persona";
import Grupo from "../db/models/Grupo";
import { PersonaResponse } from "../interfaces/persona-response.interface";
import { ProyectoResponse } from "../interfaces/proyecto-response";
import Proyecto from "../db/models/Proyecto";
import { envioCorreo } from "../helpers/enviar-correos";

//* TODO:  AQUI TENGO UNA DUDA, POR ALGÚN MOTIVO QUE NO RECUERDO CUANDO CREO LA MATERIA REGISTRO A LA PERSONA QUE LA CREO EN ELLA
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

const postGrupo = async (grupo: GrupoResponse): Promise<Grupo> => {
  const addGrupo = await Grupo.create({ ...grupo });
  return addGrupo;
};

const getMaterias = async () => {
  const materias = await Asignatura.findAll({
    include: [
      {
        model: Grupo,
        required: true,
        attributes: ["nombre", "cod_grupo"],
      },
    ],
  });
  return materias;
};

//* ⚠️ FUNCIONA BIEN PERO ME DA MUCHOS DATOS, ACOMODAR LA SALIDA
const getAlumnos = async (materia: string, grupo: string) => {
  const alumnos = await Asignatura.findAll({
    where: { cod_asignatura: materia },
    include: [
      {
        model: Grupo,
        attributes: ["cod_grupo", "nombre"],
        where: { nombre: grupo },
        include: [
          {
            model: Persona,
            attributes: [
              "nombres",
              "apellidos",
              "codigo",
              "correo_institucional",
            ],
            required: true,
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });
  return alumnos;
};

const postExcelAlumnos = async (
  file: File,
  materia: string,
  grupo: string
): Promise<string[]> => {
  const nombreArchivo = await validarArchivo(file);
  const pathArchivo = path.join(__dirname, "../uploads/", nombreArchivo);
  let logs: string[] = [];
  let registro = false;
  await readXlsxFile(pathArchivo).then(async (rows) => {
    rows.shift();

    for (const alumno of rows) {
      const persona: PersonaResponse = {
        correo_institucional: alumno[0].toString(),
        nombres: alumno[1].toString(),
        apellidos: alumno[2].toString(),
        cod_rol: 2,
        codigo: alumno[3].toString(),
        perfil_completado: false,
      };
      registro = await postAlumno(persona, materia, grupo);
      registro
        ? logs.push(`registro exitoso!!!`)
        : logs.push(
            `El estudiante ${alumno[1]} ${alumno[2]} ya se encuentra registrado en otro grupo de esta materia`
          );
    }
  });
  if (fs.existsSync(pathArchivo)) {
    fs.unlinkSync(pathArchivo);
  }
  return logs;
};

const existeAlumnoEnSistema = async (
  correo_institucional: string,
  materia: string
): Promise<boolean[]> => {
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
    }),
  ]);
  return [
    existeAlumno ? true : false,
    existeAlumnoEnMateria.length === 0 ? false : true,
  ];
};

//** 👀 HAY UN PEQUEÑO PROBLEMA, SI ME MANDAN UN CODIGO DE ESTUDIANTE QUE YA ESTA INSCRITO Y EL CORREO QUE ME MANDAN NO ESTA EN LA BD, Y COMO ESTOY HACIENDO LA BUSQUEDA POR CORREO TRATARA DE REGISTRARLO EN LA TABLA PERSONA, LO CUAL DARÁ ERROR PORQUE NO PUEDEN HABER DOS CODIGOS IGUALES */
const postAlumno = async (
  persona: PersonaResponse,
  materia: string,
  grupo: string
): Promise<boolean> => {
  let registrado: boolean = false;
  const [existeAlumno, existeAlumnoEnMateria] = await existeAlumnoEnSistema(
    persona.correo_institucional,
    materia
  );

  if (!existeAlumno) {
    const estudiante: PersonaResponse = {
      correo_institucional: persona.correo_institucional,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      cod_rol: 2,
      codigo: persona.codigo,
      perfil_completado: false,
    };
    await Persona.create({ ...estudiante });
  }

  if (!existeAlumnoEnMateria) {
    await sequelize.query("CALL Materia_Grupo_Estudiante(?,?,?)", {
      replacements: [persona.correo_institucional, grupo, materia],
    });
    registrado = true;
    await envioCorreo(persona, materia, grupo) 
  }
  return registrado;
};

const postProyecto = async (
  cod_asignatura: string,
  grupo: string,
  proyecto: ProyectoResponse
) => {
  proyecto.nombres = proyecto.nombres.toLowerCase();
  const regProyecto = await Proyecto.create({ ...proyecto });
  const findGrupo = await Grupo.findOne({
    where: {
      cod_asignatura,
      nombre: grupo,
    },
  });

  const intermedia = await sequelize.query(
    `insert into proyectos_grupo (proyectoCodProyecto, grupoCodGrupo) values(${regProyecto.cod_proyecto}, ${findGrupo?.cod_grupo})`
  );
  return intermedia;
};

const getAlumnosProyecto = async (
  cod_asignatura: string,
  grupo: string,
  cod_proyecto: number
) => {
  const proyecto = await Grupo.findAll({
    where: { cod_asignatura, nombre: grupo },
    attributes: ["cod_asignatura", "nombre"],
    include: [
      {
        model: Proyecto,
        where: { cod_proyecto },
        required: true,
        through: {
          attributes: [],
        },
        include: [
          {
            model: Persona,
            attributes: ["nombres", "apellidos", "codigo", "img"],
            required: true,
            through: {
              attributes: [],
            },
            include: [
              {
                model: Asignatura,
                required: true,
                where: { cod_asignatura },
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
      },
    ],
  });

  return proyecto;
};

const postAlumnoProyecto = async (
  cod_proyecto: number,
  correo_institucional: string,
  materia: string,
  grupo: string
) => {
  await existeAlumnoGrupo(correo_institucional, materia, grupo);
  await tieneProyecto(correo_institucional,materia, grupo);

  const existe = await sequelize.query(
    `select * from persona_proyecto 
    where personaCorreoInstitucional = "${correo_institucional}" and proyectoCodProyecto = ${cod_proyecto}`
  );

  if (existe[0].length !== 0) {
    throw new Error(
      `La persona con correo institucional: ${correo_institucional} ya esta registrada en este proyecto`
    );
  }
  await sequelize.query(
    `insert into persona_proyecto (personaCorreoInstitucional, proyectoCodProyecto) 
      values ("${correo_institucional}", ${cod_proyecto})`
  );
};

const existeAlumnoGrupo = async (
  correo_institucional: string,
  materia: string,
  grupo: string
) => {
  const existe = await Persona.findOne({
    where: { correo_institucional },
    include: [
      {
        model: Grupo,
        where: { cod_asignatura: materia, nombre: grupo },
        required: true,
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!existe) {
    throw new Error(
      `El alumno no esta registrado en el grupo: ${grupo} de la materia: ${materia}`
    );
  }
};

const getListadoProyectos = async (cod_asignatura: string, grupo: string) => {
  const proyectos = await Grupo.findAll({
    where: { cod_asignatura, nombre: grupo },
    include: [
      {
        model: Proyecto,
        required: true,
        through: {
          attributes: [],
        },
      },
    ],
  });

  return proyectos;
};

const tieneProyecto = async (
  correo_institucional: string,
  cod_asignatura: string,
  grupo: string
) => {
  const persona = await Grupo.findAll({
    where: { cod_asignatura, nombre: grupo },
    attributes: ["cod_asignatura", "nombre"],
    include: [
      {
        model: Proyecto,
        required: true,
        through: {
          attributes: [],
        },
        include: [
          {
            model: Persona,
            where: { correo_institucional },
            attributes: ["nombres", "apellidos", "codigo", "img"],
            required: true,
            through: {
              attributes: [],
            },
            include: [
              {
                model: Asignatura,
                required: true,
                where: { cod_asignatura },
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
      },
    ],
  });

  if(persona.length !== 0){
    throw new Error(`El alumno ya tiene un proyecto asignado en esta materia`)
  }
};

export {
  postMateria,
  postGrupo,
  postExcelAlumnos,
  postAlumno,
  postProyecto,
  postAlumnoProyecto,
  getMaterias,
  getAlumnos,
  getAlumnosProyecto,
  getListadoProyectos,
};
