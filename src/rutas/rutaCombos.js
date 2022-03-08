const { Router } = require('express');

const controladorCombo = require('../controladores/controladorCombo');
const router = Router();

router.get('/', controladorCombo.inicio);
router.get('/listarcombo', controladorCombo.listarCombos);
router.post('/guardarcombo', controladorCombo.guardar);
router.put('/modificarcombo', controladorCombo.modificar);
router.put('/eliminarcombo', controladorCombo.eliminar);

module.exports = router;