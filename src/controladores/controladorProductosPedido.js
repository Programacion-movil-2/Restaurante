const modeloProductosPedido = require('../modelos/modeloProductosPedido');
const msj = require('../componentes/mensaje');

exports.inicioProductosPedido = async (req, res) =>{
    msj("Estas en el inicio de Productos Pedido", 200, [], res);
};

exports.listarProductosPedido = async (req, res) =>{
    const listaComboPedido = await modeloProductosPedido.findAll();
    
    if(listaComboPedido.length == 0){
        msj("No existen Productos pedidos en la base", 200, [], res);
    }
    else{
        res.json(listaComboPedido);
    }
};

/*-------------------------------------------------CRUD----------------------------------------*/
exports.guardarProductosPedido = async (req, res) =>{
    const{idProductosPedido, idProducto,cantidad} = req.body; 
    if(!idProductosPedido || !idProducto || !cantidad)
    {
        msj("Debe enviar los datos que se solicitan", 200, [], res);
    }
    else{
        await modeloProductosPedido.create({
            idProductosPedido: idProductosPedido,
            idProducto: idProducto,
            cantidad:cantidad
        })
        .then((data)=>{ 
            console.log(data.nombre);
            msj("Registro almacenado correctamente...", 200, [], res);
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al guardar los datos...", 200, [], res);
        });
    }
};  

//Conulta de Modificar
exports.modificarProductosPedido = async (req, res) =>{
    const {idProductosPedido} = req.query;
    const{cantidad} = req.body; 

    if(!idProductosPedido || !cantidad){
        msj("Por favor envíe los datos para la actualización...", 200, [], res);
    }
    else{
        var buscarProductosPedido = await modeloProductosPedido.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idProductosPedido: idProductosPedido
            }
        });

        //Validar si está null el campo
        if (!buscarProductosPedido) {
            msj("El id no existe", 200, [], res);
        }
        else{
            buscarProductosPedido.cantidad = cantidad;
            buscarProductosPedido.save()

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
exports.eliminarProductosPedido = async (req, res) =>{
    const {idProductosPedido} = req.query;

    //Validamos que nos esten enviando los datos
    if (!idProductosPedido) {
        //Mostramos mensaje al usuario
        msj("Por favor escriba el dato a eliminar...", 200, [], res);
    }
    else{
        await modeloProductosPedido.destroy({
            where:{
                idProductosPedido: idProductosPedido
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
