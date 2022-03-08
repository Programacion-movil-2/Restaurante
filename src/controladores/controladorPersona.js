//Funciones Específicas
const ModeloPersona = require('../modelos/modeloPersona');
exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de personas");
};

/*-------------------------------------------------CRUD----------------------------------------*/
//Consulta para que muestre la lista de personas
exports.listarPersonas = async (req, res) =>{
    const listaPersonas = await ModeloPersona.findAll();
    
    if(listaPersonas.length == 0){
        res.send("No existen personas en la base");
    }
    else{
        res.json(listaPersonas);
    }
};

//Consulta para guardar
exports.guardarPersona = async (req, res) =>{
    //Capturamos los valores que vienen desde el postmas o aplicación
    const{nombre, apellido, idCargo} = req.body; // Se recomienda colocar así como está en la BDD

    //Compruebo que si vengan datos y le digo al usuario que sino que revise
    if(!nombre || !apellido || !idCargo)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloPersona.create({ //Esto es para almacenar los datos que se reciben
            nombre: nombre,
            apellido: apellido,
            idCargo: idCargo,
        })
        .then((data)=>{ //Este es para el mensaje que confirma el almacenamiento
            console.log(data.nombre);
            res.send("Registro almacenado correctamente...");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos...");
        });
    }
};  

//Conulta de Modificar
exports.modificarPersona = async (req, res) =>{
    const {idPersona} = req.query;
    const { nombre, apellido, telefono, idCargo } = req.body;

    //Validamos que nos esten enviando los datos
    if (!idPersona || !nombre || !apellido) {
        //Mostramos mensaje al usuario
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarPersona = await ModeloPersona.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idPersona: idPersona
            }
        });

        //Validar si está null el campo
        if (!buscarPersona) {
            res.send("El id no existe");
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
exports.eliminarPersona = async (req, res) =>{
    const {idPersona} = req.query;

    //Validamos que nos esten enviando los datos
    if (!idPersona) {
        //Mostramos mensaje al usuario
        res.send("Por favor escriba el dato a eliminar...");
    }
    else{
        await ModeloPersona.destroy({
            where:{
                idPersona: idPersona
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