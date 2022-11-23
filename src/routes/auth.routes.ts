import { Router } from "express";
import { login, registroProfesor } from "../controllers/auth.controller";
import { crearProfesor } from "../middlewares/validators/login.validator";
import { validarJWT } from "../middlewares/validar-jwt";
import { validarRolDocente } from "../middlewares/validar-campos";

const router = Router();

//* 🉑 INICIAR SESIÓN
router.post("/login/:correo_institucional", login);

//** SOLO PUEDE REGISTRAR DOCENTES OTRO DOCENTE */
router.post(
  "/registroProfesor",
  [validarJWT, validarRolDocente], //👮
  crearProfesor,
  registroProfesor
);

export default router;
