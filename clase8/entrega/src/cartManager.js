const fs = require('fs')

class CartManager {
    constructor (path) {
        this.path = path
    }

    static cartIdCounter = 1;

    getCarts() {
        return this.read()
    }

    getCartById(id) {
        let carts = this.getCarts();
        let cart = carts.find(cart => cart.id === id);

        let products = []
        if (!cart){
            console.log('Error: No se encontro un producto con ese id.')
        }
        else {
            products = cart.products;
        }
        return products;

    }

    createCart(products){
        // Get current id
        let currentId = CartManager.cartIdCounter;
        let cart = {}
        let carts = this.getCarts();

        if (carts) {
            currentId = carts.reduce((max, prod) => (prod.id > max ? prod.id : max), 0);
            CartManager.cartIdCounter = currentId;
        }

        // Increment ID counter
        CartManager.cartIdCounter += 1;

        // // Set cart id
        cart.id = CartManager.cartIdCounter;
        if (Array.isArray(products)) {
            cart.products = [];
            products.forEach(product => {
                cart.products.push(product);
            });
        } else {
            cart.products = [products];
        }

        // Append cart to carts list
        carts.push(cart);

        // Save new cart list into the file
        this.save(carts);

    }

    // addProduct(product) {
    //     // Check that the product meets all the requested fields
    //     if (!product.title || !product.description || !product.price || !product.category || !product.code || !product.stock || !product.status) {
    //         console.log("Error: Todos los campos son obligatorios.");
    //         return 1;
    //     }

    //     // Check that the are not already products with that id
    //     let products = this.getProducts();
    //     if (products.some(prod => prod.id === product.id)){
    //         console.log("Error: El código ingresado ya existe en otro producto.");
    //         return 1;
    //         }

    //     // Get current id
    //     let currentId = ProductManager.productIdCounter;
    //     if (products) {
    //         currentId = products.reduce((max, prod) => (prod.id > max ? prod.id : max), 0);
    //         ProductManager.productIdCounter = currentId;
    //     }

    //     // Increment ID counter
    //     ProductManager.productIdCounter += 1;

    //     // Set product id
    //     product.id = ProductManager.productIdCounter;

    //     // Append product to products list
    //     products.push(product);

    //     // Save new product list into the file
    //     this.save(products);
    // }


    // Methods to work with files

    save(carts){
        let jsonCart = JSON.stringify(carts, null, 2);
        fs.writeFileSync(this.path, jsonCart);
    }

    read(){
        let products = []
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf8');
            if (data.trim() !== '') { // Verifica si el archivo no está vacío
                products = JSON.parse(data);
            }
        }
        return products
    }

}

// Testing

// 1. Se creará una instancia de la clase "CartManager"
const cartsURL = './carritos.json'
const manager = new CartManager(cartsURL);

// 2. Se llamará “getCarts” recién creada la instancia, debe devolver un arreglo vacío []
let currentCarts = manager.getCarts();
console.log('Lista de carritos:', currentCarts);

// 3. Creo dos carritos.
let cart1 = {'id': 1, 'quantity':1}
let cart2 = {'id': 2, 'quantity':1}

let cart3 = [{'id': 1, 'quantity':1}, {'id': 2, 'quantity':1}]

manager.createCart(cart1);
manager.createCart(cart2);
manager.createCart(cart3);
currentCarts = manager.getCarts();
console.log('Lista de carritos:', currentCarts);

// 4. Mostrar los productos de ese carrito
let id = 1;
let productos = manager.getCartById(id);
console.log(`Los productos asociados al carrito de id ${id}, son: `, productos);


module.exports = CartManager;
// export default CartManager;