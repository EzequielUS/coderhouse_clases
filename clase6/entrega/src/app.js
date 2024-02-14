const express = require('express')
const ProductManager = require('./productManager')
const app = express()

// Permitir que interprete mejor los datos complejos que viajen desde la url
app.use(express.urlencoded({extended:true}));

// Inicio mi clase de ProductManager
const path = './productos.json'
const manager = new ProductManager(path)

// Endpoints
app.get('/', (req, res) => {
    res.send('Soy el endpoint de acceso inicial');
})

// ruta: /products
app.get('/products', (req, res) => {
    products = manager.getProducts();
    res.send(products);
})

// ruta: /products/:id
app.get('/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    product = manager.getProductById(id);
    res.send(product);
})

// Iniciar el servidor en el puerto 8000
app.listen(8000, () => console.log('Servidor escuchando en el puerto 8000'));