const express = require("express");
const cartsRouter = express.Router()
const CartManager = require('../cartManager')

// Inicio mi clase de ProductManager
const path = './carritos.json'
const manager = new CartManager(path);

cartsRouter.get("/:cid", (req, res) => {
    let cid = parseInt(req.params.cid);
    let products = manager.getCartById(cid);
    res.status(200).json({ success: true, message: products });
})

cartsRouter.post("/", (req, res) => {
    let products = req.body;
    manager.createCart(products);
    res.status(200).json({ success: true, message: 'El carrito se creo exitosamente' });
    }
)

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    let result = manager.addProduct(cid, pid);

    if (result === 1) {
        res.status(500).json({ success: false, message: 'Hubo un error al agregar el producto' })
    } else {
        res.status(200).json({ success: true, message: 'El producto se agregó exitosamente' });
    }
    }
)

module.exports = cartsRouter;