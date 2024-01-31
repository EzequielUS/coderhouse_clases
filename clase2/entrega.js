class ProductManager {
    constructor () {
        this.products = []
    }
    static productNumber = 0;
    static productsKeys = []

    addProduct(product) {
        // Reviso que cuente con todos los campos necesarios
        let fields = Object.keys(product)
    }

    getProducts() {
        return this.products
    }

    getProductById(id){
        if (this.products.includes(id)) {
            console.log(this.products)
        } else {
            console.log('Not found')
        }
    }

}

// Testing
// const manager = new ProductManager();
// let currentProducts = manager.getProducts()
