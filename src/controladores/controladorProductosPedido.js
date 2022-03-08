const modeloProductosPedido = require('../modelos/modeloProductosPedido');
exports.inicioProductosPedido = async (req, res) =>{
    res.send("Estas en el inicio de Productos Pedido");
};

exports.listarProductosPedido = async (req, res) =>{
    const listaComboPedido = await modeloProductosPedido.findAll();
    
    if(listaComboPedido.length == 0){
        res.send("No existen Productos pedidos en la base");
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
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await modeloProductosPedido.create({
            idProductosPedido: idProductosPedido,
            idProducto: idProducto,
            cantidad:cantidad
        })
        .then((data)=>{ 
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
exports.modificarProductosPedido = async (req, res) =>{
    const {idProductosPedido} = req.query;
    const{idProducto,cantidad} = req.body; 

    if(!idProductosPedido || !idProducto || !cantidad){
        res.send("Por favor envíe los datos para la actualización...");
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
            res.send("El id no existe");
        }
        else{
            buscarProductosPedido.idProductosPedido = idProductosPedido;
            buscarProductosPedido.idProducto = idProducto;
            buscarProductosPedido.cantidad = cantidad;
            buscarProductosPedido.save()

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
exports.eliminarProductosPedido = async (req, res) =>{
    const {idProductosPedido} = req.query;

    //Validamos que nos esten enviando los datos
    if (!idProductosPedido) {
        //Mostramos mensaje al usuario
        res.send("Por favor escriba el dato a eliminar...");
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
