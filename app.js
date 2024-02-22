const express = require('express');
const router = require('./rutas/index.js');
const bodyParser = require('body-parser'); // Importa bodyParser
const controller = require('./controlador/controlador.js');

const app = express();
const PORT = 3000;
// Usamos bodyParser para análisis de JSON
app.use(bodyParser.json()); 
// Usa bodyParser para análisis de URL codificado
app.use(bodyParser.urlencoded({ extended: true })); 
// AÑADIMOS EXPRESS PARA PODER EL USO DE HTML Y CSS
app.use(express.static('html'));

// FUNCION FLECHA
app.use((req, res, next) => {
    // SACAMOS EL CUERPO DE LA SOLICITUD
    console.log(req.body);
    // LLAMAMOS A LA FUNCION SIGUIENTE
    next();
});

// RUTA DE LA AP
app.use('/api/v1', router);
// RUTA PARA SERVIR EL FORMULARIO
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/formulario.html');
});

// HACEMOS APPLISTEN DUNCION FLECHA
app.listen(PORT, () => {
    // DONDE NOS ESPECIFICA EL PUERTO QUE ESTA CORRINEDO
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    // ESPECIFICAMOS LA RUTA DEL LOCALHOST
    console.log('http://localhost:3000');
});