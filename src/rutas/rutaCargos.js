//Definimos las variables
const { Router } = require('express');

//Vinculamos el archivo para cargarlo
const controladorCargo = require('../controladores/controladorCargo');
const router = Router();

//Definimos dos variables reques(reciben), res(envian respuestas)
router.get('/', controladorCargo.inicio);
router.get('/listar', controladorCargo.listarCargos);
router.post('/guardar', controladorCargo.guardarCargo);
router.put('/modificar', controladorCargo.modificarCargo);
router.delete('/eliminar', controladorCargo.eliminarCargo);

module.exports = router;