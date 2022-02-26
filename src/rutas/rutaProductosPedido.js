const { Router } = require('express');

const controladorProductosPedido = require('../controladores/controladorProductosPedido');
const router = Router();

router.get('/', controladorProductosPedido.inicio);
router.get('/listarProductosPedido', controladorProductosPedido.listarProductosPedido);
router.post('/guardarProductosPedido', controladorProductosPedido.guardar);
router.put('/modificarProductosPedido', controladorProductosPedido.modificarCantidad);
// router.delete('/eliminarProductosPedido', controladorProductosPedido.eliminar);

module.exports = router;