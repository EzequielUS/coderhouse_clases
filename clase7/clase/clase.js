
// En Node.js, al trabajar con Express u otro framework web, el objeto req (abreviatura de "request") representa la solicitud HTTP recibida por el servidor. Aquí está una breve explicación de cada una de las propiedades que mencionaste:

// req.method: Esta propiedad contiene el método HTTP utilizado en la solicitud. Por ejemplo, GET, POST, PUT, DELETE, etc. Puedes utilizar esta propiedad para determinar qué tipo de operación se está realizando en la solicitud.
app.get('/example', function(req, res) {
    console.log(req.method); // Imprime el método HTTP utilizado en la solicitud (GET)
    res.send('Ejemplo de uso de req.method');
});


// req.url: Esta propiedad contiene la URL de la solicitud recibida. Incluye la ruta, los parámetros de consulta y cualquier otra información específica de la URL. Puedes usar esta propiedad para acceder a la ruta solicitada y realizar acciones basadas en ella.
app.get('/example', function(req, res) {
    console.log(req.url); // Imprime la URL de la solicitud (/example)
    res.send('Ejemplo de uso de req.url');
});


// req.query: Esta propiedad contiene los parámetros de consulta de la URL de la solicitud. Cuando se envían datos desde un formulario HTML o desde una solicitud GET, los parámetros de la URL se envían como parte de la consulta. Por ejemplo, si la URL es /users?id=123, entonces req.query.id contendrá el valor '123'. Puedes utilizar esta propiedad para acceder a los datos enviados en la consulta.
app.get('/search', function(req, res) {
    const query = req.query.q; // Obtiene el parámetro 'q' de la consulta (ejemplo: /search?q=nodejs)
    console.log(query); // Imprime el valor del parámetro 'q' (nodejs)
    res.send('Ejemplo de uso de req.query');
});


// req.params: Esta propiedad contiene los parámetros de ruta de la URL de la solicitud. Cuando se define una ruta en Express con parámetros, estos parámetros se extraen de la URL y se almacenan en req.params. Por ejemplo, si tienes una ruta como /users/:id, entonces req.params.id contendrá el valor del parámetro id en la URL. Puedes utilizar esta propiedad para acceder a los parámetros de la ruta.
app.get('/users/:id', function(req, res) {
    const userId = req.params.id; // Obtiene el parámetro 'id' de la ruta (ejemplo: /users/123)
    console.log(userId); // Imprime el valor del parámetro 'id' (123)
    res.send('Ejemplo de uso de req.params');
});


// req.body: Esta propiedad contiene los datos enviados en el cuerpo de la solicitud HTTP, generalmente en solicitudes POST o PUT. Cuando se envían datos desde un formulario HTML o desde una solicitud POST, estos datos se envían en el cuerpo de la solicitud y pueden ser accedidos a través de req.body. Es importante tener en cuenta que req.body no está disponible de forma nativa en Express y generalmente se requiere un middleware como body-parser para analizar los datos del cuerpo de la solicitud y hacerlos accesibles en req.body.
// Requiere el middleware body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', function(req, res) {
    const userData = req.body; // Obtiene los datos enviados en el cuerpo de la solicitud POST
    console.log(userData); // Imprime los datos enviados en el cuerpo de la solicitud
    res.send('Ejemplo de uso de req.body');
});


// Estas son algunas de las propiedades más comunes del objeto req en Node.js que se utilizan para acceder a diferentes partes de la solicitud HTTP recibida por el servidor y realizar acciones basadas en ella.