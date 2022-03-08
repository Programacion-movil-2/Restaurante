const { Router } = require('express');

const controladorProductos = require('../controladores/controladorProductosPedido');
const router = Router();

router.get('/', controladorProductos.inicioProductosPedido);
router.get('/listarProductosPedido', controladorProductos.listarProductosPedido);
router.post('/guardarProductosPedido', controladorProductos.guardarProductosPedido);
router.put('/modificarProductosPedido', controladorProductos.modificarProductosPedido);
router.delete('/eliminarProductosPedido', controladorProductos.eliminarProductosPedido);

module.exports = router;