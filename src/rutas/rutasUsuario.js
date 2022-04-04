const { Router } = require('express');
const controladorUsuarios = require('../controladores/controladorUsuario');
const { body, query } = require('express-validator');
const ctrlAutenticacion = require('../controladores/Autenticacion');
const msj = require('../componentes/mensaje');
const router = Router();
router.get('/', controladorUsuarios.inicio);
router.get('/listar',  controladorUsuarios.listar);
router.post('/guardar',
body('identidad').isLength({min: 13}).withMessage('La longitud minima es de 13 caracteres'),  
body('nombreUsuario').isLength({min: 5}).withMessage('La longitud minima es de 5 caracteres'), 
body('correo').isEmail().withMessage('Ingrese un correo válido / example123@gmail.com'), 
body('contrasena').isLength({min: 6}).withMessage('La contraseña debe tener una longitud minima de 6 caracteres'), controladorUsuarios.guardar);
router.put('/modificarContrasena',
body('correo').isEmail().withMessage('Ingrese un correo válido / example123@gmail.com'),
body('pin').isLength({min: 4}).withMessage('La longitud minima es de 4 caracteres'),
body('contrasena').isLength({min: 6}).withMessage('La contraseña debe tener una longitud minima de 6 caracteres'), controladorUsuarios.modificarContrasena);
router.delete('/eliminar', controladorUsuarios.eliminar);
module.exports = router;  