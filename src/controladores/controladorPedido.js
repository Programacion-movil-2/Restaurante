const ModeloPedido = require('../modelos/modeloPedido');

exports.inicioPedidos = async (req, res) =>{
    res.send("Estas en el inicio de pedidos");
};

exports.listarPedidos = async (req, res) =>{
    const listaPedidos = await ModeloPedido.findAll({
        where:{
            estado:'recibido',
        }
    });
    
    if(listaPedidos.length == 0){
        res.send("No existen pedidos en la base");
    }
    else{
        res.json(listaPedidos);
    }
};

exports.listarPedidosUsuario = async (req, res) =>{
    const {idUsuario} = req.query;
    var listaPedidosUsuario = await ModeloPedido.findAll({
        where:{
            idUsuario:idUsuario,
        }
    });
    
    if(this.listaPedidosUsuario.length == 0){
        res.send("No existen pedidos de este usuario en la base");
    }
    else{
        res.json(this.listaPedidosUsuario);
    }
};

/*-------------------------------------------------CRUD----------------------------------------*/
exports.guardarPedido = async (req, res) =>{
    const{direccionEntrega, idCombos,nombreUsuario,idProductosPedido} = req.body; 
    //Compruebo que si vengan datos y le digo al usuario que sino que revise
    if(!direccionEntrega || !nombreUsuario || !idProductosPedido)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloPedido.create({
            direccionEntrega: direccionEntrega,
            idCombos: idCombos,
            nombreUsuario:nombreUsuario,
            idProductosPedido:idProductosPedido,
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
exports.modificarPedido = async (req, res) =>{
    const {idPedido} = req.query;
    const{direccionEntrega, idCombos,nombreUsuario,idProductosPedido,subtotal} = req.body; 


    if (!idPedido || !nombreUsuario || !direccionEntrega) {
        //Mostramos mensaje al usuario
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarPedido = await ModeloPedido.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idPedido: idPedido
            }
        });

        //Validar si está null el campo
        if (!buscarPedido) {
            res.send("El id no existe");
        }
        else{
            buscarPedido.direccionEntrega = direccionEntrega;
            buscarPedido.idCombos = idCombos;
            buscarPedido.nombreUsuario = nombreUsuario;
            buscarPedido.idProductosPedido = idProductosPedido;
            buscarPedido.subtotal = subtotal;
            buscarPedido.save()

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
exports.eliminarPedido = async (req, res) =>{
    const {idPedido} = req.query;
    
    if (!idPedido) {
        //Mostramos mensaje al usuario
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarPedido = await ModeloPedido.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idPedido: idPedido
            }
        });
        //Validar si está null el campo
        if (!buscarPedido) {
            res.send("El id no existe");
        }
        else{
            buscarPedido.estado='inactivo';
            buscarPedido.save()

            //Mostramos mensaje de verificación
            .then((data) => {
                console.log(data);
                res.send("Registro Eliminado...");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar los datos...");
            });
        }
    }
};