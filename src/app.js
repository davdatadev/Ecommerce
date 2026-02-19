import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import jwt from 'jsonwebtoken'
import { initializePassport } from './config/passport.config.js';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import sessionsRouter from './routes/sessionsRouter.js';
import __dirname, { constants } from './utils/constantsUtil.js';
import websocket from './websocket.js';

const app = express();

const MONGO_URL = constants.MONGO_URL

mongoose.connect(MONGO_URL)
    .then(() => console.log("Conectado a la base de datos"))
    .catch(error => console.error("Error en la conexión:", error))

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

// Passport Middleware
initializePassport();
app.use(passport.initialize());

app.use((req, res, next) => {
    const token = req.cookies[constants.JWT_COOKIE_NAME];
    if (token) {
        try {
            const user = jwt.verify(token, constants.JWT_SECRET);
            res.locals.user = user; // Inyectamos el usuario en las vistas
            res.locals.isLoggedIn = true;
            res.locals.isAdmin = user.role === 'admin'; // Utilidad extra por si la necesitas
        } catch (error) {
            res.locals.user = null;
            res.locals.isLoggedIn = false;
        }
    } else {
        res.locals.user = null;
        res.locals.isLoggedIn = false;
    }
    next();
})

//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

const PORT = constants.PORT;
const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);