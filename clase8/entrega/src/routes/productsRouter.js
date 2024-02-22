const express = require("express");
const productRouter = express.Router()
const ProductManager = require('../productManager')

// Inicio mi clase de ProductManager
const path = './productos.json'
const manager = new ProductManager(path);


productRouter.get("/", (req, res) => {
    let limit = req.query.limit;
    products = manager.getProducts();
    if (limit){
        products = products.slice(0, limit);
    }
    res.status(200).send(products);
})

productRouter.get("/:pid", (req, res) => {
    let pid = parseInt(req.params.pid);
    product = manager.getProductById(pid);
    res.status(200).send(product);
})

productRouter.post("/", (req, res) => {})

productRouter.put("/:pid", (req, res) => {})

productRouter.delete("/:pid", (req, res) => {})

module.exports = productRouter;