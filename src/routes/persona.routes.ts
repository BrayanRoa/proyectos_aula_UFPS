import { Router } from "express";
import { actualizarPersona } from "../controllers/persona.controller";
import { validarJWT } from "../middlewares/validar-jwt";
import { validarPersona } from "../middlewares/validators/persona.validators";

const router = Router();

//* FIXME: VALIDAR LA EXTENSION DEL ARCHIVO
router.patch("/:codigo", [validarJWT], validarPersona, actualizarPersona);


export default router;
