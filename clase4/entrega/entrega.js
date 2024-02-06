const fs = require('fs')

class ProductManager {
    constructor () {
        this.path = './productos.json'
    }

    static productIdCounter = 1;

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        let products = this.getProducts();
        if (products.some(prod => prod.code === product.code)){
            console.log("Error: El código ingresado ya existe en otro producto.");
            return;
        }

        product.id = ProductManager.productIdCounter;
        ProductManager.productIdCounter += 1;

        this.save(product);
    }

    getProducts() {
        return this.read()
    }

    getProductById(id){
        let products = this.getProducts()
        let product = products.find(prod => prod.id === id)

        if (!product) {
            console.log('Not found');
            return;
        }

        return product
    }

    updateProduct(id, updatedProduct){
    }

    deleteProduct(id){

    }

    save(product){
        let jsonProduct = JSON.stringify(product, null, 2);
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, jsonProduct);
        }
        else {
            fs.appendFileSync(this.path, jsonProduct);
        }
    }

    read(){
        let products = []
        if (fs.existsSync(this.path)) {
            products = fs.readFileSync(this.path);
            products = JSON.parse(products);
        }
        return products
    }
}

// let product1 = {
//     'title': 'test',
//     'description': 'test',
//     'price': 100,
//     'thumbnail': 'test.png',
//     'code': 1,
//     'stock': 100,
// }

// let product2 = {
//     'title': 'test',
//     'description': 'test',
//     'price': 100,
//     'thumbnail': 'test.png',
//     'code': 2,
//     'stock': 100,
// }

// // Testing
// const manager = new ProductManager();

// // get current products
// let currentProducts = manager.getProducts();
// console.log('Productos actuales:', currentProducts);

// add new product
// manager.addProduct(product1);
// currentProducts = manager.getProducts();
// console.log('Productos actuales:', currentProducts);

// manager.addProduct(product2);
// currentProducts = manager.getProducts();
// console.log('Productos actuales:', currentProducts);

// // get product by id
// let id = 2;
// let product = manager.getProductById(id);
// console.log(`El producto con el id ${id}, es: `, product);