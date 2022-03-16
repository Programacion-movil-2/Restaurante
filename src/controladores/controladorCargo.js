//Funciones Específicas
const ModeloCargo = require('../modelos/modeloCargo');
const msj = require('../componentes/mensaje');
exports.inicio = async (req, res) =>{
    msj("Estas en el inicio de cargos", 200, [], res);
};

/*-------------------------------------------------CRUD----------------------------------------*/
//Consulta para que muestra los cargos existentes
exports.listarCargos = async (req, res) =>{
    const listaCargos = await ModeloCargo.findAll();
    
    if(listaCargos.length == 0){
        msj("No existen cargos en la base", 200, [], res);
    }
    else{
        res.json(listaCargos);
    }
};

exports.guardarCargo = async (req, res) =>{
    //Capturamos los valores que vienen desde el postmas o aplicación
    const{ nombreCargo } = req.body; // Se recomienda colocar así como está en la BDD

    //Compruebo que si vengan datos y le digo al usuario que sino que revise
    if(!nombreCargo)
    {
        msj("Debe enviar los datos que se solicitan", 200, [], res);
    }
    else{
        await ModeloCargo.create({ //Esto es para almacenar los datos que se reciben
            nombreCargo: nombreCargo
        })
        .then((data)=>{ //Este es para el mensaje que confirma el almacenamiento
            console.log(data.nombreCargo);
            msj("Registro almacenado correctamente...", 200, [], res);
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al guardar los datos...", 200, [], res);
        });
    }
};  

//Conulta de Modificar
exports.modificarCargo = async (req, res) =>{
    const {idCargos} = req.query;
    const { nombreCargo } = req.body;

    //Validamos que nos esten enviando los datos
    if (!idCargos || !nombreCargo) {
        //Mostramos mensaje al usuario
        msj("Por favor envíe los datos para la actualización...", 200, [], res);
    }
    else{
        var buscarCargo = await ModeloCargo.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idCargos: idCargos
            }
        });

        //Validar si está null el campo
        if (!buscarCargo) {
            msj("El id no existe", 200, [], res);
        }
        else{
            buscarCargo.nombreCargo = nombreCargo;
            buscarCargo.save()

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
exports.eliminarCargo = async (req, res) =>{
    const {idCargos} = req.query;

    //Validamos que nos esten enviando los datos
    if (!idCargos) {
        //Mostramos mensaje al usuario
        msj("Por favor escriba el dato a eliminar...", 200, [], res);
    }
    else{
        await ModeloCargo.destroy({
            where:{
                idCargos: idCargos
            }
        })
        .then((data) => {
            console.log(data);

            //Verificamos que exista el id
            if (data == 0) {
                msj("El id no existe", 200, [], res);
            }
            else
            {
                msj("Registro eliminado...", 200, [], res);
            }
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al eliminar el registro...", 200, [], res);
        });
    }
};