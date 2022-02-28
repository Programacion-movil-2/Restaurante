//Definimos las variables
const { Router } = require('express');

//Vinculamos el archivo para cargarlo
const controladorPersona = require('../controladores/controladorPersonas');
const router = Router();

//Definimos dos variables reques(reciben), res(envian respuestas)
router.get('/', controladorPersona.inicio);
router.get('/listar', controladorPersona.listarPersonas);
router.post('/guardar', controladorPersona.guardar);
router.put('/modificar', controladorPersona.modificar);
router.delete('/eliminar', controladorPersona.eliminar);

module.exports = router;