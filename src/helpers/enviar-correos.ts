import { PersonaResponse } from "../interfaces/persona-response.interface";
import sgMail from "./mailer";

//* FIXME: VER COMO PUEDO COLOCAR UNA PLANTILLA DE HTML AQUÍ
export const envioCorreo = async (
  persona: PersonaResponse,
  materia: string,
  grupo: string
) => {
  const msg = {
    to: persona.correo_institucional, // Change to your recipient
    from: process.env.EMAIL!, // Change to your verified sender
    subject: "Disney Rest API",
    text: `Hi ${persona.nombres} ${persona.apellidos}`,
    html: `
          <h1>BIENVENIDO AL SISTEMA DE GESTION DE PROYECTOS DE LA UFPS</h1>

          <div>
            <p align="center">
                <a href="https://ingsistemas.cloud.ufps.edu.co/" target="blank"><img src="https://ww2.ufps.edu.co/public/archivos/elementos_corporativos/logo-horizontal.jpg" width="400" alt="UFPS Logo" /></a>
            </p>
        </div>

          <strong>Hola ${persona.nombres} ${persona.apellidos}, El siguiente correo es para notificarle que ha sido registrado en la materia: ${materia} grupo ${grupo}, ingresa a la plataforma y completa tus datos de perfil si aún no lo has hecho 

          <a href="https://ingsistemas.cloud.ufps.edu.co/" target="blank"><img src="https://ww2.ufps.edu.co/public/archivos/elementos_corporativos/logo-horizontal.jpg" width="400" alt="UFPS Logo" />Ir a la plataforma</a>
          </strong>
           hope you're well
          `,
  };

  await sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};
