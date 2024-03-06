const express = require('express')
const productRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter')

const app = express();
const port = 8000

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// Routes
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);


app.listen(port, () => console.log("Servidor corriendo en el puerto: " + port))
