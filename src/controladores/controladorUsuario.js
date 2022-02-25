const ModeloUsuario = require("../modelos/modeloUsuario");
const { validationResult } = require('express-validator');
exports.inicio = (req, res) => {

    res.send("Esto es el Inicio deL Módulo de Usuarios");

}  
exports.listar = async (req, res) =>{

    const lista = await ModeloUsuario.findAll();
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
        const { nombreUsuario, correo, contrasena, idPersona } = req.body;
        if(!nombreUsuario || !correo || !contrasena || !idPersona){

            res.send("Debe enviar los datos obligatorios");

        }
        else{

            await ModeloUsuario.create({
                nombreUsuario,
                correo,
                contrasena,
                idPersona
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
        const {nombreUsuario} = req.query;
        const {contrasena} = req.body;
        if(!nombreUsuario || !contrasena){
            res.send("Debe enviar los Datos Obligatorios");
        }
        else{

            var buscarUsuario = await ModeloUsuario.findOne({
                where:{
                    nombreUsuario: nombreUsuario,
                    estado: 'activo'
                }
            });
            if(!buscarUsuario){
                res.send("El id no existe o no se encuentra activo");
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

    const {nombreUsuario} = req.query;
    if(!nombreUsuario){
        res.send("Debe enviar el Id");
    }
    else{

        await ModeloUsuario.destroy({
            where:{
                nombreUsuario: nombreUsuario
            }
        })
        .then((data) => {
            console.log(data);
            if(data==0){
                res.send("El Id ingresado, no existe");
            }
            else{
                res.send("Registro Eliminado Correctamente")
            }  
        })
        .catch((err) => {
            console.log(err);
            res.send("Error al eliminar");
        });
    }    

}