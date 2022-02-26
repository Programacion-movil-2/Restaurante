const ModeloPedido = require('../modelos/modeloPedido');

exports.listarPedidos = async (req, res) =>{
    const listaPedidos = await ModeloPedido.findAll();
    
    if(listaPedidos.length == 0){
        res.send("No existen pedidos en la base");
    }
    else{
        res.json(listaPedidos);
    }
};

/*-------------------------------------------------CRUD----------------------------------------*/
exports.guardarPedido = async (req, res) =>{
    const{direccionEntrega, idCombo,nombreUsuario,idProductosPedido} = req.body; 
    //Compruebo que si vengan datos y le digo al usuario que sino que revise
    if(!direccionEntrega || !nombreUsuario || !idProductosPedido)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloPedido.create({
            direccionEntrega: direccionEntrega,
            idCombo: idCombo,
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
    const{direccionEntrega, idCombo,nombreUsuario,idProductosPedido} = req.body; 


    if (!idPedido || !nombreUsuario || !direccionEntrega) {
        //Mostramos mensaje al usuario
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarPedido = await ModeloPedido.findOne({
            //Le digo cual es el dato que comparará
            where:{
                id: id
            }
        });

        //Validar si está null el campo
        if (!buscarPedido) {
            res.send("El id no existe");
        }
        else{
            buscarPedido.direccionEntrega = direccionEntrega;
            buscarPedido.idCombo = idCombo;
            buscarPedido.nombreUsuario = nombreUsuario;
            buscarPedido.idProductosPedido = idProductosPedido;
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

    //Validamos que nos esten enviando los datos
    if (!idPedido) {
        //Mostramos mensaje al usuario
        res.send("Por favor escriba el dato a eliminar...");
    }
    else{
        await ModeloPedido.destroy({
            where:{
                idPedido: idPedido
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