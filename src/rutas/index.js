//Definimos las variables
const { Router } = require('express');

//Vinculamos el archivo para cargarlo
const controladorRaiz = require('../controladores/controladorInicio')
const router = Router();

//Definimos dos variables reques(reciben), res(envian respuestas)
//router.use('/', controladorRaiz.raiz);

router.use('/otra', controladorRaiz.otra);

module.exports = router;