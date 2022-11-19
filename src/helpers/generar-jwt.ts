/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import jwt from 'jsonwebtoken'

export const generarJWT = async (data: string, data2: string) => {
  return await new Promise((resolve, reject) => {
    const payload = { data, data2 }
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
