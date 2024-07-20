import bcrypt from 'bcryptjs'
import { UserModel } from '../models/users.model.js'
import { generarJWT } from '../helpers/jwt.js'

const userCreate = async(req, res) => {

    const { email, password } = req.body

    try {

        let user = await UserModel.findOne({ email }) // Se busca usuario por email
        if(user) { // Si existe el usuario mostramos un error
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }
        user = new UserModel(req.body) // Se crea el usuario
        const salt = bcrypt.genSaltSync() // Se genera una contraseña
        user.password = bcrypt.hashSync(password, salt) // Se encripta la contraseña
        await user.save() // Se almacena el usuario

        // Generar JWT
        const token = await generarJWT(user._id, user.name)

    
        res.status(201).json({ // Se envia un JSON con el usuario creado
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }

}


const userLogin = async(req, res) => {

    const { email, password } = req.body

    try {

        const user = await UserModel.findOne({ email })

        if(!user) { // Si el usuario no existe retornamos un error
            return res.status(400).json({
                ok: false,
                msg: 'Email incorrecto'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password) // Se compara la contraseña

        if(!validPassword) { // Si la contraseña es incorrecta retornamos un error
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generar JWT
        const token = await generarJWT(user._id, user.name)

        res.status(200).json({ // Se envia un JSON con el usuario logueado
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}


const tokenRenew = async(req, res) => {

    const {uid, name} = req

    const token = await generarJWT({ uid, name })

    res.json({
        ok: true,
        token
    })
}


export {
    userCreate,
    userLogin,
    tokenRenew
}