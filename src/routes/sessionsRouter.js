import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import userModel from '../dao/models/userModel.js'
import { createHash, isValidPassword } from '../utils/crypt.js'
import { constants } from '../utils/constantsUtil.js'
import { cartDBManager } from '../dao/cartDBManager.js'
import UserDTO from '../dtos/user.dto.js'

const router = Router()
const CartService = new cartDBManager();

router.post('/registro', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body
    try {
        if (!first_name || !last_name || !email || !age || !password) return res.status(400).send('Ingrese todos los datos')
        
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(400).send({ status: 'error', message: 'El usuario ya existe' })
        }

        const newCart = await CartService.createCart();

        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: newCart._id,
            role: 'user'
        }

        const result = await userModel.create(user)
        res.status(201).send({ status: 'success', message: 'Usuario registrado', user: result })
    }
    catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(400).send('Ingrese todos los datos')
        
        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).send({ status: 'error', message: 'Credenciales incorrectas!' })
        
        if (!isValidPassword(user, password)) return res.status(400).send({ status: 'error', message: 'Credenciales incorrectas!' })
        
        const userDTO = new UserDTO(user);

        const token = jwt.sign({...userDTO}, 
            constants.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.cookie(constants.JWT_COOKIE_NAME, token, {
            maxAge: 60 * 60 * 1000, // 1 hora
            httpOnly: true // Solo accesible desde el servidor
        }).json({
            usuarioLogueado: userDTO,
        });

    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
})

// Current para probar el jwt y obtener los datos del usuario logueado
router.get('/current', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const userDTO = new UserDTO(req.user)
        res.send(userDTO)
})

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie(constants.JWT_COOKIE_NAME).send({ status: 'success', message: 'Usuario deslogueado' })  
    }
)

export default router