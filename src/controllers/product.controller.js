import { productDBManager } from "../dao/productDBManager.js";
import ProductRepository from "../repositories/product.repository.js";

// Instancia del DAO y del servicio (capas)
const productDAO = new productDBManager();
const productService = new ProductRepository(productDAO);

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query)
        res.status(200).json({ status: 'success', payload: products })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.status(200).json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (req.files) {
            req.body.thumbnails = req.files.map(file => file.filename);
        }

        const result = await productService.updateProduct(req.params.pid, req.body);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.pid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
}