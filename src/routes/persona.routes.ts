import { Router } from "express";
import { actualizarPersona } from "../controllers/persona.controller";
import { validarJWT } from "../middlewares/validar-jwt";
import { validarPersona } from "../middlewares/validators/persona.validators";

const router = Router();

router.patch("/:codigo", [validarJWT], validarPersona, actualizarPersona);

// router.patch("/:codigo", [validarJWT], validarPersona, actualizarFotoPerfil);


// router.post('/')

export default router;
