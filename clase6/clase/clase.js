// Exponiendo un puerto de la PC utilizando la libreria http

const http = require('http');

const server = http.createServer((request, response) => {
    response.end('Mi primer endpoint')
})

server.listen(8000, () => {
    console.log('Listening on port 8080')
})