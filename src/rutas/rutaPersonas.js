//Definimos las variables
const { Router } = require('express');

//Vinculamos el archivo para cargarlo
const controladorPersona = require('../controladores/controladorPersona');
const router = Router();

//Definimos dos variables reques(reciben), res(envian respuestas)
router.get('/', controladorPersona.inicio);
router.get('/listar', controladorPersona.listarPersonas);
router.post('/guardar', controladorPersona.guardarPersona);
router.put('/modificar', controladorPersona.modificarPersona);
router.delete('/eliminar', controladorPersona.eliminarPersona);

module.exports = router;