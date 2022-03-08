//Definimos las variables
const { Router } = require('express');

//Vinculamos el archivo para cargarlo
const controladorFacturacion = require('../controladores/controladorFacturacion');
const router = Router();

//Definimos dos variables reques(reciben), res(envian respuestas)
router.get('/', controladorFacturacion.inicio);
router.get('/listar', controladorFacturacion.listarFacturas);
router.post('/guardar', controladorFacturacion.guardarFactura);
router.put('/modificar', controladorFacturacion.modificarFactura);
router.delete('/eliminar', controladorFacturacion.eliminarFactura);

module.exports = router;