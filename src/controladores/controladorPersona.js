//Funciones Específicas
const ModeloPersona = require('../modelos/modeloPersona');
const msj = require('../componentes/mensaje');
exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de personas");
};

/*-------------------------------------------------CRUD----------------------------------------*/
//Consulta para que muestre la lista de personas
exports.listarPersonas = async (req, res) =>{
    const listaPersonas = await ModeloPersona.findAll({

        where:{
            estado:'activo',
        }

    });    

    if(listaPersonas.length == 0){
        msj("No existen personas en la base", 200, [], res);
    }
    else{
        res.json(listaPersonas);
    }
};

//Consulta para guardar
exports.guardarPersona = async (req, res) =>{
    //Capturamos los valores que vienen desde el postmas o aplicación
    const{ identidad, nombre, apellido, telefono, direccion} = req.body; // Se recomienda colocar así como está en la BDD

    //Compruebo que si vengan datos y le digo al usuario que sino que revise
    if(!identidad || !nombre || !apellido || !telefono)
    {
        msj("Debe enviar los datos que se solicitan", 200, [], res);
    }
    else{
        await ModeloPersona.create({ //Esto es para almacenar los datos que se reciben
            identidad: identidad,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            direccion: direccion
        })
        .then((data)=>{ //Este es para el mensaje que confirma el almacenamiento
            //console.log(data.nombre);
            msj("Registro almacenado correctamente...", 200, [], res);
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al guardar los datos...", 200, [], res);
        });
    }
};  

//Conulta de Modificar
exports.modificarPersona = async (req, res) =>{
    const {identidad} = req.query;
    const { nombre, apellido, telefono, idCargo} = req.body;

    //Validamos que nos esten enviando los datos
    if (!identidad || !nombre || !apellido, !telefono) {
        //Mostramos mensaje al usuario
        msj("Por favor envíe los datos para la actualización...", 200, [], res);
    }
    else{
        var buscarPersona = await ModeloPersona.findOne({
            //Le digo cual es el dato que comparará
            where:{
                identidad: identidad
            }
        });

        //Validar si está null el campo
        if (!buscarPersona) {
            msj("El id no existe", 200, [], res);
        }
        else{
            buscarPersona.nombre = nombre;
            buscarPersona.apellido = apellido;
            buscarPersona.telefono = telefono;
            buscarPersona.idCargo = idCargo;
            buscarPersona.save()

            //Mostramos mensaje de verificación
            .then((data) => {
                console.log(data);
                msj("Registro actualizado y guardado...", 200, [], res);
            })
            .catch((error)=>{
                console.log(error);
                msj("Error al modificar los datos...", 200, [], res);
            });
        }
       
    }

};

//Conulta de Eliminar
exports.eliminarPersona = async (req, res) =>{
    const {identidad} = req.query;

    //Validamos que nos esten enviando los datos
    if (!identidad) {
        //Mostramos mensaje al usuario
        msj("Por favor envíe los datos para la actualización...", 200, [], res);
    }
    else{
        var buscarPersona = await ModeloPersona.findOne({
            //Le digo cual es el dato que comparará
            where:{
                identidad: identidad
            }
        });

        //Validar si está null el campo
        if (!buscarPersona) {
            msj("El id no existe", 200, [], res);
        }
        else{
            buscarPersona.estado = 'inactivo';
            buscarPersona.save()

            //Mostramos mensaje de verificación
            .then((data) => {
                console.log(data);
                msj("Registro Eliminado", 200, [], res);
            })
            .catch((error)=>{
                console.log(error);
                msj("Error al eliminar los datos...", 200, [], res);
            });
        }
       
    }
    
};