const { Router } = require('express');

const controladorTipoProducto = require('../controladores/controladorTipoProducto');
const router = Router();

router.get('/', controladorTipoProducto.inicio);
router.get('/listarTipoProducto', controladorTipoProducto.listarTiposProductos);
router.post('/guardar', controladorTipoProducto.guardar);
router.put('/modificar', controladorTipoProducto.modificar);
router.delete('/eliminar', controladorTipoProducto.eliminar);

module.exports = router;