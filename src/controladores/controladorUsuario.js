const ModeloUsuario = require("../modelos/modeloUsuario");
const { validationResult } = require('express-validator');
const msj = require('../componentes/mensaje');
exports.inicio = (req, res) => {

    res.send("Esto es el Inicio deL Módulo de Usuarios");

}  
exports.listar = async (req, res) =>{

    const lista = await ModeloUsuario.findAll({

        where:{
            estado:'activo',
        }

    });
    if(!lista){
        res.send("No existen Usuarios en la base de datos");
    }
    else{
        res.json(lista);
    }

}
exports.guardar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion.array());
        res.json(validacion.array());
    }
    else{
        const { nombreUsuario, correo, contrasena } = req.body;
        if(!nombreUsuario || !correo || !contrasena ){

            msj("Debe enviar los datos obligatorios", 200, [], res);

        }
        var buscarUsuario = await ModeloUsuario.findOne({
            where:{
                nombreUsuario: nombreUsuario
            }
        });
        var buscarCorreo = await ModeloUsuario.findOne({
            where:{
                correo: correo
            }
        });
        if(buscarUsuario || buscarCorreo){
            console.log("El Usuario y/o el Correo ya se encuentran registrados");
            msj("El Usuario y/o el Correo ya se encuentran registrados", 200, [], res);
        }
        else{

            await ModeloUsuario.create({
                nombreUsuario,
                correo,
                contrasena
            })
            .then((data) => {
                //console.log(data.contrasena);
                msj("Registro Almacenado!", 200, [], res);            
            }).catch((err) => {
                console.log(err);
                msj("Error al guardar los datos", 200, [], res);
            });
        }
    }
    
}
exports.modificarContrasena = async (req, res) =>{

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion.array());
        res.json(validacion.array());
    }
    else{
        const {idUsuario} = req.query;
        const {contrasena} = req.body;
        if(!idUsuario || !contrasena){
            msj("Debe enviar los Datos Obligatorios", 200, [], res);
        }
        else{

            var buscarUsuario = await ModeloUsuario.findOne({
                where:{
                    idUsuario: idUsuario,
                    estado: 'activo'
                }
            });
            if(!buscarUsuario){
                msj("El Usuario no existe o no se encuentra activo", 200, [], res);
            }
            else{

                buscarUsuario.contrasena = contrasena;
                await buscarUsuario.save()
                .then((data) => {
                    console.log(data);
                    msj("Registro Actualizado Correctamente", 200, [], res);
                }).catch((err) => {
                    console.log(err);
                   msj("Error al Actualizar", 200, [], res);
                });

            }
            console.log(buscarUsuario);
        }
    }
    
}
exports.eliminar = async (req, res) =>{

    const {idUsuario} = req.query;
    const {nombreUsuario} = req.body;
    if(!nombreUsuario || !idUsuario){
        msj("Debe enviar el Nombre de Usuario", 200, [], res);
    }
    else{

        var buscarUsuario = await ModeloUsuario.findOne({
            where:{
                nombreUsuario: nombreUsuario
            }
        })
        if(!buscarUsuario){
            msj("El usuario no existe", 200, [], res);
        }
        else{

            buscarUsuario.estado = 'inactivo';
            buscarUsuario.save()

            .then((data) => {
                console.log(data);
                msj("Registro Eliminado Correctamente", 200, [], res); 
            })
            .catch((err) => {
                console.log(err);
                msj("Error al eliminar", 200, [], res);
            });

        }
    }    

}