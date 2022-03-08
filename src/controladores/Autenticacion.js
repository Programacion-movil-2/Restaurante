const ModeloUsuario = require('../modelos/modeloUsuario');
const { validationResult } = require('express-validator');
const passport = require('../configuracion/passport');
//const enviarCorreo = require('../configuracion/correo');
const msj = require('../componentes/mensaje');
const { min, max } = require('moment');
let dig1, dig2, dig3, dig4;

exports.InicioSesion = async (req, res) =>{

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        msj("Los datos ingresados no son válidos", 200, validacion.array(), res);
    }
    else{
        const { nombreUsuario, contrasena } = req.body;
        const BuscarUsuario = await ModeloUsuario.findOne({
            where:{
                nombreUsuario: nombreUsuario
            }
        });
        if(!BuscarUsuario){
            msj("El usuario no existe o se encuentra inactivo", 200, [], res);
        }
        else{
            if(!BuscarUsuario.VerificarContrasena(contrasena, BuscarUsuario.contrasena)){
                msj("El usuario o contraseña incorrecta", 200, [], res)
            }
            else{
                const Token = passport.getToken({nombreUsuario: BuscarUsuario.nombreUsuario});
                const data = {
                    token: Token,
                    // usuario: BuscarUsuario.nombreUsuario
                };
                 const nombreLogin = BuscarUsuario.nombreUsuario;
                msj("¡Bienvenido(a) " + nombreLogin +"!", 200, data, res);
            }            
        }          
    }

}

exports.ValidarAutenticado = passport.validarAutenticado;

exports.ErrorAutenticado = (req, res) =>{
    
    msj("Error en la autenticación del usuario", 200, [], res);

}

exports.RecuperarCorreo = async (req, res) =>{

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion.array());
        res.json(validacion.array());
    }
    else{
        const {correo} = req.body;
        const buscarUsuario = await ModeloUsuario.findOne({

            where:{
                correo
            }

        });
        const pin = String.prototype.concat(dig1,dig2,dig3,dig4);
        const data ={
            correo: correo,
            pin: pin,
        };
        enviarCorreo.recuperarContrasena(data);
        res.send("Correo Enviado");
    }
    
};

function generarPin(minimo, maximo){
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}
for(let i = 1; i <= 10; i++){
    dig1 = generarPin(0, 9);
    dig2 = generarPin(0, 9);
    dig3 = generarPin(0, 9);
    dig4 = generarPin(0, 9);
}