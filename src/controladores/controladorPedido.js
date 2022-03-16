const ModeloPedido = require('../modelos/modeloPedido');
const msj = require('../componentes/mensaje');

exports.inicioPedidos = async (req, res) =>{
    msj("Estas en el inicio de pedidos", 200, [], res);
};

exports.listarPedidos = async (req, res) =>{
    const listaPedidos = await ModeloPedido.findAll({
        where:{
            estado:'recibido',
        }
    });
    
    if(listaPedidos.length == 0){
        msj("No existen pedidos en la base", 200, [], res);
        
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
        msj("No existen pedidos de este usuario en la base", 200, [], res);
    }
    else{
        res.json(this.listaPedidosUsuario);
    }
};

/*-------------------------------------------------CRUD----------------------------------------*/
exports.guardarPedido = async (req, res) =>{
    const{direccionEntrega, idCombos,nombreUsuario,idProductosPedido} = req.body; 
    //Compruebo que si vengan datos y le digo al usuario que sino que revise
    if(!direccionEntrega || !nombreUsuario || !idProductosPedido){
        msj("Debe enviar los datos que se solicitan", 200, [], res);
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
            msj("Registro almacenado correctamente...", 200, [], res);
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al guardar los datos...", 200, [], res);
        });
    }
};  

//Conulta de Modificar
exports.modificarPedido = async (req, res) =>{
    const {idPedido} = req.query;
    const{direccionEntrega, idCombos,nombreUsuario,idProductosPedido,subtotal} = req.body; 


    if (!idPedido || !nombreUsuario || !direccionEntrega) {
        //Mostramos mensaje al usuario
        msj("Por favor envíe los datos para la actualización...", 200, [], res);
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
            msj("El id no existe", 200, [], res);
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
exports.eliminarPedido = async (req, res) =>{
    const {idPedido} = req.query;
    
    if (!idPedido) {
        //Mostramos mensaje al usuario
        msj("Por favor envíe los datos para la eliminación", 200, [], res);
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
            msj("El id no existe", 200, [], res);
        }
        else{
            buscarPedido.estado='inactivo';
            buscarPedido.save()

            //Mostramos mensaje de verificación
            .then((data) => {
                console.log(data);
                msj("Registro Eliminado...", 200, [], res);
            })
            .catch((error)=>{
                console.log(error);
                msj("Error al eliminar los datos...", 200, [], res);
            });
        }
    }
};