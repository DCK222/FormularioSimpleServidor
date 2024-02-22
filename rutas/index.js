// IMPORTAMOS MODULOS
const express = require('express');
const controller = require('../controlador/controlador.js');

// CREAMOS EL ENRUTADOR
const router = express.Router();

// POST PARA ACTUALIZAR Y ELIMINAR DATOS
router.post('/datos/update', controller.updateDato); 
router.post('/datos/delete', controller.deleteDato);

// PARA ANALIZAR EL JSON
router.use(express.json()); 

// GET POST PUT Y DELETE PARA EL CRUD
router.get('/datos', controller.getAllDatos);
router.get('/datos/:id', controller.getDato);
router.post('/datos', controller.createDato);
router.put('/datos/:id', controller.updateDato);
router.delete('/datos/:id', controller.deleteDato);

// EXPORTAMOS EL ROUTER
module.exports = router;