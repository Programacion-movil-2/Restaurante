//Definimos las variables
const { Router } = require('express');

//Vinculamos el archivo para cargarlo
const controladorPedido = require('../controladores/controladorPedido');
const router = Router();

//Definimos dos variables reques(reciben), res(envian respuestas)
router.get('/listarPedido', controladorPedido.listarPedidos);
router.post('/guardarPedido', controladorPedido.guardarPedido);
router.put('/modificarPedido', controladorPedido.modificarPedido);
router.delete('/eliminarPedido', controladorPedido.eliminarPedido);

module.exports = router;