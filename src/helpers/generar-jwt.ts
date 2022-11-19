import jwt from 'jsonwebtoken'

export const generarJWT = async (uuid: string, cod_rol: number) => {
  return await new Promise((resolve, reject) => {
    const payload = { uuid, cod_rol }
    jwt.sign(payload, process.env.SECRET_JWT ?? '', {
      expiresIn: '4h'
    }, (err, token) => {
      if (err != null) {
        reject('No se pudo generar el jwt')
      }
      resolve(token)
    })
  })
}
