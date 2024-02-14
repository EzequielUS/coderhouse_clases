const express = require('express')
const app = express()

// Permitir que interprete mejor los datos complejos que viajen desde la url
app.use(express.urlencoded({extended:true}));

// Endpoints
app.get('/', (req, res) => {
    res.send('Soy un endpoint');
})

// Iniciar el servidor en el puerto 8000
app.listen(8000, () => console.log('Servidor'));