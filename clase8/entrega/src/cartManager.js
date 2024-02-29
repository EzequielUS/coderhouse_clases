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

    addProduct(cid, pid) {
        // Check if that cart id exists
        let carts = this.getCarts();
        let cartIndexToUpdate = carts.findIndex(cart => cart.id === cid);

        if (cartIndexToUpdate === -1){
            console.log("Error: No existe un carrito con ese id.");
            return 1;
        }

        // Check if that product exists, if it does, it should increase quantity, else, it should add it to the array
        let productIndexToUpdate = carts[cartIndexToUpdate].products.findIndex(prod => prod.id === pid);

        // Check if the requested product exists
        if (productIndexToUpdate === -1) {
            carts[cartIndexToUpdate].products.push({'id': pid, 'quantity': 1});
        } else {
            carts[cartIndexToUpdate].products[productIndexToUpdate].quantity += 1;
        }

        // Save new product list into the file
        this.save(carts);
    }


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

// // 1. Se creará una instancia de la clase "CartManager"
// const cartsURL = './carritos.json'
// const manager = new CartManager(cartsURL);

// // 2. Se llamará “getCarts” recién creada la instancia, debe devolver un arreglo vacío []
// let currentCarts = manager.getCarts();
// console.log('Lista de carritos:', currentCarts);

// // 3. Creo dos carritos.
// let cart1 = {'id': 1, 'quantity':1}
// let cart2 = {'id': 2, 'quantity':1}
// let cart3 = [{'id': 1, 'quantity':1}, {'id': 2, 'quantity':1}]

// manager.createCart(cart1);
// manager.createCart(cart2);
// manager.createCart(cart3);
// currentCarts = manager.getCarts();
// console.log('Lista de carritos:', currentCarts);

// // 4. Mostrar los productos de ese carrito
// let id = 1;
// let productos = manager.getCartById(id);
// console.log(`Los productos asociados al carrito de id ${id}, son: `, productos);

// // 5.1 Agregar un producto a un carrito
// id = 1
// let cart4 = 99
// manager.addProduct(id, cart4);
// console.log('Lista de carritos:', currentCarts);

// // 5.1 Agregar un producto existente a un carrito
// id = 3
// let cart5 = 2
// manager.addProduct(id, cart5);
// console.log('Lista de carritos:', currentCarts);

module.exports = CartManager;
// // export default CartManager;