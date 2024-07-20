// Rutas de usuarios / auth
// host + /api/auth

import { Router } from 'express'
import { check } from 'express-validator'
import { userCreate, userLogin, tokenRenew } from '../controllers/auth.js'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

const router = Router()


router.post(
    '/new',
    // Middlewares - ExpressValidator
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    userCreate
)

router.post(
    '/',
    // Middlewares - ExpressValidator
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ] ,   
    userLogin
)

router.get('/renew', validateJWT, tokenRenew)


export default router