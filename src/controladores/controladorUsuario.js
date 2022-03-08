const ModeloUsuario = require("../modelos/modeloUsuario");
const { validationResult } = require('express-validator');
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

            res.send("Debe enviar los datos obligatorios");

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
            res.send("El Usuario y/o el Correo ya se encuentran registrados");
        }
        else{

            await ModeloUsuario.create({
                nombreUsuario,
                correo,
                contrasena
            })
            .then((data) => {
                console.log(data.contrasena);
                res.send("Registro Almacenado!");              
            }).catch((err) => {
                console.log(err);
                res.send("Error al guardar los datos");
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
            res.send("Debe enviar los Datos Obligatorios");
        }
        else{

            var buscarUsuario = await ModeloUsuario.findOne({
                where:{
                    idUsuario: idUsuario,
                    estado: 'activo'
                }
            });
            if(!buscarUsuario){
                res.send("El Usuario no existe o no se encuentra activo");
            }
            else{

                buscarUsuario.contrasena = contrasena;
                await buscarUsuario.save()
                .then((data) => {
                    console.log(data);
                    res.send("Registro Actualizado Correctamente");
                }).catch((err) => {
                    console.log(err);
                    res.send("Error al Actualizar");
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
        res.send("Debe enviar el Nombre de Usuario");
    }
    else{

        var buscarUsuario = await ModeloUsuario.findOne({
            where:{
                nombreUsuario: nombreUsuario
            }
        })
        if(!buscarUsuario){
            res.send("El usuario no existe");
        }
        else{

            buscarUsuario.estado = 'inactivo';
            buscarUsuario.save()

            .then((data) => {
                console.log(data);
                res.send("Registro Eliminado Correctamente"); 
            })
            .catch((err) => {
                console.log(err);
                res.send("Error al eliminar");
            });

        }
    }    

}