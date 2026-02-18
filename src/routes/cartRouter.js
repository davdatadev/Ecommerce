import { Router } from 'express';
import passport from 'passport';
import { auth } from '../middlewares/auth.js';
import * as cartController from '../controllers/cart.controller.js';

const router = Router();

// Get cart by ID
router.get('/:cid',
    passport.authenticate('jwt', { session: false }),
    cartController.getCart
);

// Create new cart
router.post('/', cartController.createCart);

// Add product to cart
router.post('/:cid/product/:pid',
    passport.authenticate('jwt', { session: false }),
    auth('user'),
    cartController.addProductToCart
);

router.post('/:cid/purchase',
    passport.authenticate('jwt', { session: false }),
    auth('user'),
    cartController.purchaseCart
);

router.put('/:cid', 
    passport.authenticate('jwt', { session: false }),
    auth('user'),
    cartController.updateCart
);

router.put('/:cid/product/:pid', 
    passport.authenticate('jwt', { session: false }),
    auth('user'),
    cartController.updateProductQuantity
);

router.delete('/:cid/product/:pid',
    passport.authenticate('jwt', { session: false }),
    cartController.deleteProductFromCart
);

router.delete('/:cid',
    passport.authenticate('jwt', { session: false }),
    auth('user'),
    cartController.clearCart
);

export default router;