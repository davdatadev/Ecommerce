import { cartDBManager } from "../dao/cartDBManager.js";
import { productDBManager } from "../dao/productDBManager.js";
import CartRepository from "../repositories/cart.repository.js";

import { ticketDBManager } from "../dao/ticketDBManager.js";
import TicketRepository from "../repositories/ticket.repository.js";
import ProductRepository from "../repositories/product.repository.js";

// Instancia del DAO y del servicio (capas)
const productDAO = new productDBManager();
//Instancia el DAO de Carritos pasando el de Productos
const cartDAO = new cartDBManager(productDAO);
const cartService = new CartRepository(cartDAO);

const productService = new ProductRepository(productDAO);
const ticketDAO = new ticketDBManager();
const ticketService = new TicketRepository(ticketDAO);

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
        console.log("🔍 DEBUG CARRITO:");
        console.log("ID en el Token (req.user.cart):", req.user.cart);
        console.log("ID en la URL (req.params.cid):", req.params.cid);
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

export const purchaseCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const cart = await cartService.getProductsFromCartByID(cid)

        if (!cart) return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' })

        let totalAmount = 0;
        // Para productos sin stock o con cantidad insuficiente, se los agrego a un array para luego informar al usuario cuales no se pudieron procesar
        const unprocessedProducts = [];

        for (const item of cart.products) {
            const product = item.product
            const quantityInCart = item.quantity

            if (product.stock >= quantityInCart) {
                product.stock -= quantityInCart
                await productService.updateProduct(product._id, { stock: product.stock })
                totalAmount += product.price * quantityInCart;
            } else {
                unprocessedProducts.push(product);
            }
        }
        // Si hay almenos un producto genera el ticket de compra
        let ticket = null;
        if (totalAmount > 0) {
            const ticketData = {
                code: `ACDC-${Date.now()}`,
                amount: totalAmount,
                purchaser: req.user.email
            }
            ticket = await ticketService.createTicket(ticketData);
        }
        
        
        //await cartService.deleteAllProducts(cid) // Si quiero vaciar el carrito luego de la compra para los productos sin stock

        await cartService.updateAllProducts(cid, unprocessedProducts) // Dejo en el carrito solo los productos sin stock

        res.send({
            status: 'success',
            message: totalAmount > 0 ? 'Compra finalizada' : 'Ningún producto pudo procesarse por falta de stock',
            ticket: ticket,
            unprocessed: unprocessedProducts.map(p => p.product._id)
        })

    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

