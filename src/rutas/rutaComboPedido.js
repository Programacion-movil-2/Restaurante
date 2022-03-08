const { Router } = require('express');

const controladorComboPedido = require('../controladores/controladorComboPedido');
const router = Router();

router.get('/', controladorComboPedido.inicioCombosPedido);
router.get('/listarCombosPedido', controladorComboPedido.listarComboPedido);
router.post('/guardarCombosPedido', controladorComboPedido.guardarComboPedido);
router.put('/modificarCombosPedido', controladorComboPedido.modificarComboPedido);
router.delete('/eliminarCombosPedido', controladorComboPedido.eliminarComboPedido);

module.exports = router;