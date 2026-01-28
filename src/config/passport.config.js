import passport from "passport"
import passportJWT from "passport-jwt"

import { constants } from '../utils/constantsUtil.js'

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// Extraen token de cookie
const cookieExtractor = req => {
    let token = null
    // Validamos que exista req y req.cookies para evitar errores
    if (req && req.cookies) {
        token = req.cookies[constants.JWT_COOKIE_NAME]
    }
    return token
}

export const initializePassport =()=>{
    passport.use('jwt', new JWTStrategy({
            secretOrKey: constants.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor])
        }, async (usuario, done) => {
            try {
                return done(null, usuario) // usuario es el jwt_payload del token
            } catch (error) {
                return done(error)
            }
        }
    ))
}
