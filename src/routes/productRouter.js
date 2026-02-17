import { Router } from 'express';
import passport from 'passport';
import { uploader } from '../utils/multerUtil.js';
import { auth } from '../middlewares/auth.js';
import * as productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:pid', productController.getProductById);

// Crear producto
router.post('/', 
    passport.authenticate('jwt', { session: false }),
    auth('admin'),
    uploader.array('thumbnails', 3),
    productController.createProduct
);

// Actualizar producto
router.put('/:pid',
    passport.authenticate('jwt', { session: false }),
    auth('admin'),
    uploader.array('thumbnails', 3),
    productController.updateProduct
);

// Eliminar producto
router.delete('/:pid',
    passport.authenticate('jwt', { session: false }),
    auth('admin'),
    productController.deleteProduct
);

export default router;