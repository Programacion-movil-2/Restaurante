const { Router } = require('express');

const controladorProductosCombo = require('../controladores/controladorProductosCombo');
const router = Router();

router.get('/', controladorProductosCombo.inicioProductoCombo);
router.get('/listarProductosCombo', controladorProductosCombo.listarProductosCombo);
router.post('/guardarProductosCombo', controladorProductosCombo.guardarProductoCombo);
router.put('/modificarProductosCombo', controladorProductosCombo.modificarProductoCombo);
router.delete('/eliminarProductosCombo', controladorProductosCombo.eliminarProductoCombo);

module.exports = router;