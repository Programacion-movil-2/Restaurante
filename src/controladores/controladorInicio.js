//Funciones Específicas
const ModeloPersona = require('../modelos/modeloPersona');
//Va a imprimir los números del 1 al 10
//Va a ser una función asíncrona
exports.listaPersonas = async (req, res) =>{
    const listaPersonas = await ModeloPersona.findAll();
    
    if(!listaPersonas){
        res.send("No existen personas en la base");
    }
    else{
        res.json(listaPersonas)
    }
}

exports.otra = (req, res) =>{
    var respuesta = "otra";

    console.log(respuesta);
    res.send(respuesta);
}