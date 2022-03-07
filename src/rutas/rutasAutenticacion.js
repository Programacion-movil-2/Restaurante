const { Router } = require('express');
const ctrlAutenticacion = require('../controladores/Autenticacion');
const { body, query } = require('express-validator');
const router = Router();
router.post('/recuperarCorreo',
body('correo').isEmail().withMessage('Ingrese un correo válido / example123@gmail.com'), ctrlAutenticacion.RecuperarCorreo);
router.post('/iniciosesion',
body('nombreUsuario').isEmail().withMessage('Ingrese un correo válido / example123@gmail.com'), 
body('contrasena').isLength({min: 6}).withMessage('La contraseña debe tener una longitud minima de 6 caracteres'), ctrlAutenticacion.InicioSesion);
router.get('/error', ctrlAutenticacion.ErrorAutenticado);
module.exports = router;  