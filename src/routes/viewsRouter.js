import { Router } from 'express';
import { productDBManager } from '../dao/productDBManager.js';
import { cartDBManager } from '../dao/cartDBManager.js';
import { constants } from '../utils/constantsUtil.js';

const router = Router();
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page')
})

router.get('/products', async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);

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
    const products = await ProductService.getAllProducts(req.query);
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
    const response = await CartService.getProductsFromCartByID(req.params.cid);

    if (response.status === 'error') {
        return res.render(
            'notFound',
            {
                title: 'Not Found',
                style: 'index.css'
            }
        );
    }

    res.render(
        'cart',
        {
            title: 'Carrito',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(response.products))
        }
    )
});

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