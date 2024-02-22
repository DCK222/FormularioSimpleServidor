    // controlador/controlador.js
    const db = require('../db/db.js');

    class Controller {
        // FUNCION PARA OBTENER TODOS LOS DATOS
        getAllDatos(req, res) {
            // STATUS DE RESPUESTA 200 OK
            res.status(200).send({
                // MENSAJES DE VUELTA
                success: 'true',
                message: 'Datos recuperados con éxito!',
                datos: db
            });
        }

        // FUNCION PARA OBTENER DATO POR ID
        getDato(req, res) {
            // RESPUESTAS POR CONSOLA DEL ID RECIBIDO Y DE LA BASE DE DATOS
            console.log("ID recibido:", req.query.id); 
            console.log("Base de datos:", db); 
        
            const id = parseInt(req.query.id, 10); 
            const dato = db.find(d => d.id === id);
            if (dato) {
                // STATUS DE RESPUESTA 200 OK 
                res.status(200).send({
                    // MENSAJES DE RESPUESTA
                    success: 'true',
                    message: 'Dato recuperado con éxito!',
                    dato
                });
            } else {
                // MENSAJE DE RESPUESTA ERROR 404 NO
                res.status(404).send({
                    // MENSAJES ERROR POR PANTALLA
                    success: 'false',
                    message: 'Dato no encontrado'
                });
            }
        }

        // FUNCION PARA CREAR DATOS
        createDato(req, res) {
            if (!req.body.title || !req.body.description || !req.body.date || !req.body.invitados) {
                // MENSAJE DE RESPUESTA DE ERROR
                res.status(400).send({
                    // MENSAJE ERROR PR PANTALLA
                    success: 'false',
                    message: 'Se necesitan todos los datos para crear la cita'
                });
                return;
            }
        
            const id = db.length > 0 ? db[db.length - 1].id + 1 : 1;
            // CUERPO DEL DATO A CREAR
            const nuevoDato = {
                id,
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                invitados: req.body.invitados
            };
        
            // HACEMOS UN PUSH PARA CRAR EL NUEVO DATO
            db.push(nuevoDato);
            // RESPUESTA 200 OK 
            res.status(201).send({
                success: 'true',
                message: 'Dato creado con éxito',
                dato: nuevoDato
            });
        }

        updateDato(req, res) {
            // NOS TRAEMOS EL ID DEL FORM
            const id = parseInt(req.body.id, 10); 
            // BUSCAMOS POR SU ID
            const datoIndex = db.findIndex(d => d.id === id);
            if (datoIndex === -1) {
                // ESTATUS RESPUESTA 404
                return res.status(404).send({
                    // MENSAJE POR PANTALLA
                    success: 'false',
                    message: 'Dato no encontrado'
                });
            }
        
            // ACTUALIZAMOS LOS CAMPOS ANTERIORES PARA CAMBIARLOS POR LOS NUEVOS
            if (req.body.title) {
                db[datoIndex].title = req.body.title;
            }
            if (req.body.description) {
                db[datoIndex].description = req.body.description;
            }
            if (req.body.date) {
                db[datoIndex].date = req.body.date;
            }
            if (req.body.invitados) {
                db[datoIndex].invitados = req.body.invitados;
            }
        
            // RESPUESTA OK PARA LOS DATOS ACTUALIZADOS
            return res.status(200).send({
                success: 'true',
                message: 'Dato actualizado con éxito',
                dato: db[datoIndex]
            });
        }

        // FUNCION PARA BORRAR DATOS
        deleteDato(req, res) {
            // MENSAJE POR CONSOLA DATO A ELIMINAR
            console.log("ID del dato a eliminar:", req.params.id); 
            // VERIFICAMOS ID DEL DATO
            const id = parseInt(req.body.id, 10);
            const datoIndex = db.findIndex(d => d.id === id);
            // CONSOLE LOG VERIFICAR DATO A BORRAR
            console.log("Índice del dato a eliminar:", datoIndex); 
            if (datoIndex === -1) {
                // EN CASO DE ERROR
                return res.status(404).json({
                    success: false,
                    message: 'Dato no encontrado'
                });
            }
            
            // .SPLICE PARA BORRAR
            db.splice(datoIndex, 1);
            
            // RETUR MENSAJE 200 OK
            return res.status(200).json({
                success: true,
                message: 'Dato eliminado con éxito'
            });
        }
    }

    // EXPORTAMOS EL CONTROLADOR
    module.exports = new Controller();