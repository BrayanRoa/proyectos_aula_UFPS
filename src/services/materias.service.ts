import { sequelize } from "../db/conexion";
import { InscribirMateria } from "../interfaces/materia-response.interface";

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

export { postMateria };
