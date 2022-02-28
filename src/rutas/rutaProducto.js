const { Router } = require('express');

const controladorProducto = require('../controladores/controladorProducto');
const router = Router();

router.get('/', controladorProducto.inicio);
router.get('/listar', controladorProducto.listarProductos);
router.post('/guardar', controladorProducto.guardar);
router.put('/modificar', controladorProducto.modificar);
router.delete('/eliminar', controladorProducto.eliminar);

module.exports = router;