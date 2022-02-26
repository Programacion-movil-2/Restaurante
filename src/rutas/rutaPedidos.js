//Definimos las variables
const { Router } = require('express');

//Vinculamos el archivo para cargarlo
const controladorPedido = require('../controladores/controladorPedido');
const router = Router();

//Definimos dos variables reques(reciben), res(envian respuestas)
router.get('/listar', controladorPedido.listarPedidos);
router.post('/guardar', controladorPedido.guardarPedido);
router.put('/modificar', controladorPedido.modificarPedido);
router.delete('/eliminar', controladorPedido.eliminarPedido);

module.exports = router;