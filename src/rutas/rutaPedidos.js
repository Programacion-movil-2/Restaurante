//Definimos las variables
const { Router } = require('express');

//Vinculamos el archivo para cargarlo
const controladorPedido = require('../controladores/controladorPedido');
const router = Router();

router.get('/', controladorPedido.inicioPedidos);
router.get('/listarPedido', controladorPedido.listarPedidos);
router.post('/guardarPedido', controladorPedido.guardarPedido);
router.put('/modificarPedido', controladorPedido.modificarPedido);
router.delete('/eliminarPedido', controladorPedido.eliminarPedido);
router.put('/modificarDireccionEstado', controladorPedido.modificarDireccionEstado);
router.put('/modificarEstado', controladorPedido.modificarEstado);
module.exports = router;