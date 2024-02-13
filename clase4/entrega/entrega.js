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

// Testing

// 1. Se creará una instancia de la clase “ProductManager”
const product_url = './productos.json'
const manager = new ProductManager(product_url);

// 2. Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
let currentProducts = manager.getProducts();
console.log('Lista de productos original:', currentProducts);

// 3 Se llamará al método “addProduct” con los campos indicados en product1
let product1 = {
    'title': 'producto prueba',
    'description': 'Este es un producto prueba',
    'price': 200,
    'thumbnail': 'Sin imagen',
    'code': "abc123",
    'stock': 25,
}

// 3.1 El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// 3.2 Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
manager.addProduct(product1);
currentProducts = manager.getProducts();
console.log('Lista luego de agregar productos:', currentProducts);

// 4. Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
let id = 1;
let product = manager.getProductById(id);
console.log(`El producto con el id ${id}, es: `, product);

// 5. Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización
let product2 = {
    'title': 'producto prueba2',
    'description': 'Este es un producto prueba2',
    'price': 200,
    'thumbnail': 'Sin imagen2',
    'code': "abc456",
    'stock': 25,
}

id = 1;
manager.updateProduct(id, product2)
product = manager.getProductById(id);
console.log(`El producto actualizado con el id ${id}, es: `, product);

// 5. Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
id = 1;
manager.deleteProduct(id);
currentProducts = manager.getProducts();
console.log(`Lista luego de eliminar el producto con el id ${id}:`, currentProducts);

// Borro el archivo para limpiar el proceso de prueba
manager.deleteProducts()