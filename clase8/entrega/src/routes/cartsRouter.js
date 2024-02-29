const express = require("express");
const cartsRouter = express.Router()
const CartManager = require('../cartManager')

// Inicio mi clase de ProductManager
const path = './carritos.json'
const manager = new CartManager(path);

cartsRouter.get("/:cid", () => {
    let cid = parseInt(req.params.cid);
    let products = manager.getCartById(cid);
    res.status(200).json({ success: true, message: products });
})

cartsRouter.post("/", () => {
    let products = req.body;
    manager.createCart(products);
    res.status(200).json({ success: true, message: 'El carrito se creo exitosamente' });
    }
)

cartsRouter.post("/:cid/product/:pid", () => {
    let cid = req.query.cid;
    let pid = req.query.pid;
    manager.addProduct(cid, pid);
    res.status(200).json({ success: true, message: 'El producto se agrego exitosamente' });
    }
)

module.exports = cartsRouter;