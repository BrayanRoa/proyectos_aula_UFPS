import { PersonaResponse } from "../interfaces/persona-response.interface";
import Persona from "../db/models/Persona";
import { File } from "../interfaces/file-upload.interface";
import cloudinary from "../helpers/cloudinary";
import { CloudinaryResponse } from "../interfaces/cloudinary-response";

const updatePersona = async (
  persona: PersonaResponse,
  codigo: string,
  archivo: File
) => {
  if (archivo !== undefined) {
    persona.img = await updateImgPersona(archivo, codigo);
  }
  persona.perfil_completado = true;
  const update = await Persona.update(persona, {
    where: { codigo },
  });
  return update;
};

const updateImgPersona = async (
  archivo: File,
  codigo: string
): Promise<string> => {
  console.log(archivo);

  const persona = await Persona.findOne({
    where: { codigo },
  });

  if (persona?.img) {
    const nombreArray = persona.img.split("/");
    const nombre = nombreArray.pop();
    const [public_id] = nombre!.split(".");
    console.log(public_id);
    await cloudinary.uploader.destroy(`ayd-folder-pruebas/${public_id}`);
  }

  const { tempFilePath } = archivo;
  const subida: CloudinaryResponse = await cloudinary.uploader.upload(
    tempFilePath,
    {
      folder: `ayd-folder-pruebas`,
    }
  );

  return subida.secure_url;
};

export { updatePersona, updateImgPersona };
