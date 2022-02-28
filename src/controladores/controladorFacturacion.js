//Funciones Específicas
const ModeloFacturacion = require('../modelos/modeloFacturacion');
exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de facturas");
};

/*-------------------------------------------------CRUD----------------------------------------*/
//Consulta para que muestre las facturas de venta y compra existentes
exports.listarFacturas = async (req, res) =>{
    const listaFacturas = await ModeloFacturacion.findAll();
    
    if(listaFacturas.length == 0){
        res.send("No existen cargos en la base");
    }
    else{
        res.json(listaFacturas);
    }
};

exports.guardarFactura = async (req, res) =>{
    //Capturamos los valores que vienen desde el postmas o aplicación
    const{ isv, total, fecha, idPedido } = req.body; // Se recomienda colocar así como está en la BDD

    //Compruebo que si vengan datos y le digo al usuario que sino que revise
    if(!isv || !total || !fecha || !idPedido)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloCargo.create({ //Esto es para almacenar los datos que se reciben
            isv: isv,
            total: total,
            fecha: fecha,
            idPedido: idPedido,
        })
        .then((data)=>{ //Este es para el mensaje que confirma el almacenamiento
            console.log(data.isv);
            res.send("Registro almacenado correctamente...");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos...");
        });
    }
};  

//Conulta de Modificar
exports.modificarFactura = async (req, res) =>{
    const {idFactura} = req.query;
    const{ isv, total, fecha, idPedido } = req.body;

    //Validamos que nos esten enviando los datos
    if (!idFactura) {
        //Mostramos mensaje al usuario
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarFactura = await ModeloFacturacion.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idFactura: idFactura
            }
        });

        //Validar si está null el campo
        if (!buscarFactura) {
            res.send("El id de la factura no existe");
        }
        else{
            buscarFactura.isv = isv;
            buscarFactura.total = total;
            buscarFactura.fecha = fecha;
            buscarFactura.idPedido = idPedido;
            buscarFactura.save()

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
exports.eliminarFactura = async (req, res) =>{
    const {idFactura} = req.query;

    //Validamos que nos esten enviando los datos
    if (!idFactura) {
        //Mostramos mensaje al usuario
        res.send("Por favor escriba el dato a eliminar...");
    }
    else{
        await ModeloFacturacion.destroy({
            where:{
                idFactura: idFactura
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