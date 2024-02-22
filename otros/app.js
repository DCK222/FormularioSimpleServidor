// IMPORTACIONES
import router from './rutas/index.js'
import express, { json } from 'express';
import db from './db/db.js';
const app = new express();

// PARA ANALIZAR
app.use(router.json());





// COMPROBAMOS CON ESTE MIDDLEWARE SI LA PETICION ESTA VACIA
app.use((req, res, next)=>{
    // IMPRIME EL CUERPOS DE LA SOLICITUD
    console.log(req.body);
    // PASA AL LAFUNCION SIGUIENTE
    next();
});

// FUNCION GET TODOS
// PARA DEVOLVER TODOS LOS DATOS
app.get('/api/v1/datos', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Datos recuperados con éxito!',
        datos: db
    });
});

// FCUNCION GET 1
// PARA DEVOLVER SOLO 1     
app.get('/api/v1/datos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    // VERIFICAMOS EL ID RECIBIDO
    console.log("ID recibido en el servidor:", id); 
    
    // COMPROBAMOS EL ID
    const dato = db.find(d => d.id === id);
    if (dato) {
        // MENSAJES DE LA SOLICITUD 200 OK
        res.status(200).json({
            success: true,
            message: 'Dato recuperado con éxito!',
            dato
        });
    } else {
        // ELSE MENSAJE DE SOLICITUD 404 ERROR
        res.status(404).json({
            success: false,
            message: 'Dato no encontrado'
        });
    }
});

// funcion post


app.post("/api/v1/datos", (req, res) => {
    console.log(req.body.title + " " + req.body.description)
    // Si no hay título o descripción, devolvemos un error
     if (!req.body.title || !req.body.description) {
       res.status(400).send({
        success: "false",
        message: "Title and description are required"
     });
      return;
   }
    // const id = db.length + 1; solo crea un unico id
    // Accedemos al ultimo id
    const id = db[db.length - 1].id +1;
    
    const datos = { id, ...req.body }; 
    // añadimos los datos a la bbdd
    db.push(datos);
    res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(datos));
 });


// funcion put

app.put("/api/v1/datos/:id", (req, res) => {
    // Obtenemos el ID por la url
    // lo convertimos a entero
    const id = parseInt(req.params.id, 10);
    // Buscamos en el array id que coincida
    const datos = db.find(d => d.id === id);
  
    if (datos) {
        // Actualizamos el título y la descripción si nos llegan en el body
        datos.title = req.body.title ? req.body.title : datos.title;
        datos.description = req.body.description ? req.body.description : datos.description;
        // mensaje de vuelta
        return res.status(200).send({
            success: "true",
            message: "datos updated successfully",
            db: datos
        });
    } else {
        return res.status(404).send({
            success: "false",
            message: "datos does not exist"
        });
    }

});

// duncion delete
app.delete('/api/v1/datos/:id', (req, res) => {
    // CONVERTIMOS A ENTERO EL 'id' DE LA PETICION
    // SEGUNDO PARAMETRO '10' INDICA QUE ESTA EN BASE 10
    const id = parseInt(req.params.id, 10);
    // RECORRE LA BBDD PARA ENCONTRAR EL 'id' SOLICITADO    
    const datos = db.find(dbDato => dbDato.id === id);
    // SI EXISTE DEVUELVE OK. SI NO --> DEVUELVE EL ERROR     
    if (datos) {
        // SI EXISTE 'datos' (EL VALOR REQUERIDO) LO BORRAMOS
        db.splice(db.indexOf(datos), 1)
        return res.status(200).send({
            success: 'true',
            message: 'Dato eliminado con éxito!',
            // LE INDICAMOS QUE DEVUELVA 'datos' CON LA ACTUALIZACIÓN
            db: datos
        });
    } else {
        return res.status(404).send({
            success: 'false',
            message: 'Datos: NO EXISTE EL DATO CON ESE ID!'
        });
    }
});


// funcion puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});