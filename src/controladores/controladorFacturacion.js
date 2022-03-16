//Funciones Específicas
const ModeloFacturacion = require('../modelos/modeloFacturacion');
const msj = require('../componentes/mensaje');
exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de facturas");
};

/*-------------------------------------------------CR----------------------------------------*/
//Consulta para que muestre las facturas de venta y compra existentes
exports.listarFacturas = async (req, res) =>{
    const listaFacturas = await ModeloFacturacion.findAll();
    
    if(listaFacturas.length == 0){
        msj("No existen cargos en la base", 200, [], res);
    }
    else{
        res.json(listaFacturas);
    }
};

exports.guardarFactura = async (req, res) =>{
    //Capturamos los valores que vienen desde el postmas o aplicación
    const{ total, fecha, idPedido } = req.body; // Se recomienda colocar así como está en la BDD

    //Compruebo que si vengan datos y le digo al usuario que sino que revise
    if(!total || !fecha || !idPedido)
    {
        msj("Debe enviar los datos que se solicitan", 200, [], res);
    }
    else{
        await ModeloFacturacion.create({ //Esto es para almacenar los datos que se reciben
            total: total,
            fecha: fecha,
            idPedido: idPedido,
        })
        .then((data)=>{ //Este es para el mensaje que confirma el almacenamiento
            console.log(data.idPedido);
            msj("Registro almacenado correctamente...", 200, [], res);
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al guardar los datos...", 200, [], res);
        });
    }
};  