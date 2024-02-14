const fs = require('fs')

class ProductManager {
    constructor (path) {
        this.path = path
    }

    static productIdCounter = 1;

    addProduct(product) {
        // Check that the product meets all the requested fields
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        // Set product id
        product.id = ProductManager.productIdCounter;

        // Check that the are not already products with that id
        let products = this.getProducts();
        if (products.some(prod => prod.id === product.id)){
            console.log("Error: El código ingresado ya existe en otro producto.");
            return;
            }

        // Append product to products list
        products.push(product);

        // Increment ID counter
        ProductManager.productIdCounter += 1;

        // Save new product list into the file
        this.save(products);
    }

    getProducts() {
        return this.read()
    }

    getProductById(id){
        let products = this.getProducts();
        let product = products.find(prod => prod.id === id);
        if (!product) {
            console.log('Error: No se encontro un producto con ese id.')
        }
        return product;
    }

    updateProduct(id, newProduct){
        // Get existing products
        let products = this.getProducts();
        let indexToUpdate = products.findIndex(prod => prod.id === id);

        // Check if the requested product exists
        if (indexToUpdate === -1) {
            console.log('No se encontro el ID indicado.')
            return 
        }

        // Set old ID to updated product
        newProduct.id = id;

        // Update product in the products list
        products[indexToUpdate] = newProduct;

        // Save updated products
        this.save(products)

    }

    deleteProduct(id){
        // Get existing products
        let products = this.getProducts();
        let indexToDelete = products.findIndex(prod => prod.id === id);

        // Check if the requested product exists
        if (indexToDelete === -1) {
            console.log('Error: No se encontro un producto con ese id.');
            return 
        }

        // Remove product from products list
        products.splice(indexToDelete, 1);

        // Save updated products
        this.save(products);
    }

    deleteProducts(){
        this.delete()
    }

    // Methods to work with files
    save(products){
        let jsonProduct = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.path, jsonProduct);

    }

    read(){
        let products = []
        if (fs.existsSync(this.path)) {
            products = fs.readFileSync(this.path);
            products = JSON.parse(products);
        }
        return products
    }

    delete(){
        fs.unlinkSync(this.path);
    }
}

module.exports = ProductManager;