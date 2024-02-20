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
    let limit = req.query.limit;
    products = manager.getProducts();
    if (limit){
        products = products.slice(0, limit);
    }
    res.send(products);
})

// ruta: /products/:pid
app.get('/products/:pid', (req, res) => {
    let pid = parseInt(req.params.pid);
    product = manager.getProductById(pid);
    res.send(product);
})

// Iniciar el servidor en el puerto 8000
app.listen(8000, () => console.log('Servidor escuchando en el puerto 8000'));