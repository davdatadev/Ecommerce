export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    async getAllCarts() {
        return await this.dao.getAllCarts();
    }

    async getProductsFromCartByID(cid) {
        return await this.dao.getProductsFromCartByID(cid);
    }

    async createCart() {
        return await this.dao.createCart();
    }

    async addProductByID(cid, pid) {
        return await this.dao.addProductByID(cid, pid);
    }

    async deleteProductByID(cid, pid) {
        return await this.dao.deleteProductByID(cid, pid);
    }

    async updateAllProducts(cid, products) {
        return await this.dao.updateAllProducts(cid, products);
    }

    async updateProductByID(cid, pid, quantity) {
        return await this.dao.updateProductByID(cid, pid, quantity);
    }

    async deleteAllProducts(cid) {
        return await this.dao.deleteAllProducts(cid);
    }
}