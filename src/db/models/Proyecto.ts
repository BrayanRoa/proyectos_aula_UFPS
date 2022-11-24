import { sequelize, Model, DataTypes } from "../conexion";
import { ProyectoResponse } from '../../interfaces/proyecto-response';

class Proyecto extends Model implements ProyectoResponse{
  declare cod_proyecto: number;
  declare nombres: string;
  declare estado: string;
  declare activo: boolean;
  declare descripcion: string;
  declare cantidad_alumnos: number;
}

Proyecto.init(
  {
    cod_proyecto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    cantidad_alumnos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "proyecto",
    timestamps: false,
  }
);

export default Proyecto