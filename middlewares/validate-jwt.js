import jwt from 'jsonwebtoken'

export const validateJWT = (req, res, next) => {

    const token = req.header('x-token') // Se obtiene el token de la peticion

    if (!token) { // Si no hay token enviamos un error
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED) // Se desestructura el payload y se verifica el token
        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next()
}