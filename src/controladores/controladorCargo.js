//Funciones Específicas
const ModeloCargo = require('../modelos/modeloCargo');
exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de cargos");
};

/*-------------------------------------------------CRUD----------------------------------------*/
//Consulta para que muestra los cargos existentes
exports.listarCargos = async (req, res) =>{
    const listaCargos = await ModeloCargo.findAll();
    
    if(listaCargos.length == 0){
        res.send("No existen cargos en la base");
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
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloCargo.create({ //Esto es para almacenar los datos que se reciben
            nombreCargo: nombreCargo
        })
        .then((data)=>{ //Este es para el mensaje que confirma el almacenamiento
            console.log(data.nombreCargo);
            res.send("Registro almacenado correctamente...");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos...");
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
        res.send("Por favor envíe los datos para la actualización...");
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
            res.send("El id no existe");
        }
        else{
            buscarCargo.nombreCargo = nombreCargo;
            buscarCargo.save()

            //Mostramos mensaje de verificación
            .then((data) => {
                console.log(data);
                res.send("Registro actualizado y guardado...");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al modificar los datos...");
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
        res.send("Por favor escriba el dato a eliminar...");
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
                res.send("El id no existe");
            }
            else
            {
                res.send("Registro eliminado...");
            }
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al eliminar el registro...");
        });
    }
};