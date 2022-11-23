/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { Application } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { sequelize } from "../db/conexion";

//* IMPORTACIONES INTERNAS
import "../db/relaciones";
import "../helpers/expandir.express";
import authRouter from "../routes/auth.routes";
import materiasRouter from "../routes/materias.routes";

export class Server {
  private readonly app: Application;
  private readonly PORT: string;
  private readonly rutas;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT ?? "3000";
    this.rutas = {
      auth: "/api/auth",
      materias: "/api/materias",
    };

    this.db();
    this.middlewares();
    this.routes();
  }

  async db() {
    try {
      await sequelize.sync({ force: false });
      console.log(`Conexión a BD exitosa!!!`);
    } catch (error) {
      console.log(`No se pudo establecer la conexion - ${error}`);
    }
  }

  private middlewares(): any {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  private routes() {
    this.app.use(this.rutas.auth, authRouter);
    this.app.use(this.rutas.materias, materiasRouter);
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(
        `Server running on port ${this.PORT} - http://localhost:${this.PORT}`
      );
    });
  }
}
