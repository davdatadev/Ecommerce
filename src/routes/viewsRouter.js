import { Router } from 'express';
import { productDBManager } from '../dao/productDBManager.js';
import { cartDBManager } from '../dao/cartDBManager.js';
import { constants } from '../utils/constantsUtil.js';
import ProductRepository from '../repositories/product.repository.js';
import CartRepository from '../repositories/cart.repository.js';

const router = Router();
const productDAO = new productDBManager();
const productService = new ProductRepository(productDAO);

const cartDAO = new cartDBManager(productDAO); 
const cartService = new CartRepository(cartDAO);

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page')
})

router.get('/products', async (req, res) => {
    const products = await productService.getAllProducts(req.query);

    res.render(
        'index',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs)),
            prevLink: {
                exist: products.prevLink ? true : false,
                link: products.prevLink
            },
            nextLink: {
                exist: products.nextLink ? true : false,
                link: products.nextLink
            }
        }
    )
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productService.getAllProducts(req.query);
    res.render(
        'realTimeProducts',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs))
        }
    )
});

router.get('/cart/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartService.getProductsFromCartByID(cid);
        
        if (!cart) {
            return res.render('notFound', { title: 'Carrito no encontrado', style: 'index.css' });
        }

        res.render('cart', {
            title: 'Tu Carrito',
            style: 'index.css',
            cid: cid,
            products: JSON.parse(JSON.stringify(cart.products))
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: 'Error al cargar el carrito' });
    }
})

router.get('/login', (req, res) => {
    if(req.cookies[constants.JWT_COOKIE_NAME]) {
        return res.redirect('/products');
    }

    res.render('login', {
        title: 'Login',
        style: 'login.css'
    });
});

router.get('/forgot-password', (req, res) => {
    res.render('forgotPassword', {
        title: 'Recuperar Contraseña',
        style: 'index.css'
    });
})

router.get('/reset-password', (req, res) => {
    const token = req.query.token;
    
    if (!token) return res.redirect('/login');

    res.render('resetPassword', {
        title: 'Restablecer Contraseña',
        style: 'index.css',
        token: token // Hay que pasar el token a la vista para que el formulario lo incluya al hacer submit
    });
})

export default router;