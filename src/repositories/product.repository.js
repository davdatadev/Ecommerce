export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
}

    async getAllProducts(params) {
            return await this.dao.getAllProducts(params);
    }

    async getProductById(pid) {
        return await this.dao.getProductByID(pid);
    }

    async createProduct(product) {
        return await this.dao.createProduct(product);
    }

    async updateProduct(pid, productUpdate) {
        return await this.dao.updateProduct(pid, productUpdate);
    }

    async deleteProduct(pid) {
        return await this.dao.deleteProduct(pid);
    }
}