import { cartDBManager } from "../dao/cartDBManager.js";
import { productDBManager } from "../dao/productDBManager.js";
import CartRepository from "../repositories/cart.repository.js";

// Instancia del DAO y del servicio (capas)
const productDAO = new productDBManager();
//Instancia el DAO de Carritos pasando el de Productos
const cartDAO = new cartDBManager(productDAO);
const cartService = new CartRepository(cartDAO);


export const getCart = async (req, res) => {
    try {
        const result = await cartService.getProductsFromCartByID(req.params.cid);
        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const createCart = async (req, res) => {
    try {
        const result = await cartService.createCart();
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const addProductToCart = async (req, res) => {
    try {
        if (req.user.cart.toString() !== req.params.cid) {
            return res.status(403).send({ status: 'error', message: 'No puedes agregar productos a un carrito que no es tuyo' });
        }
        const result = await cartService.addProductByID(req.params.cid, req.params.pid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const updateCart = async (req, res) => {
    try {
        const result = await cartService.updateAllProducts(req.params.cid, req.body.products);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
};

export const updateProductQuantity = async (req, res) => {
    try {
        const result = await cartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const result = await cartService.deleteProductByID(req.params.cid, req.params.pid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}
export const clearCart = async (req, res) => {
    try {
        const result = await cartService.deleteAllProducts(req.params.cid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}



