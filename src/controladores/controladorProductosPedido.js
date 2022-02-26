const ModeloProductosPedido = require('../modelos/modeloProductosPedido');

exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de productos pedido");
};

exports.listarProductosPedido = async (req, res) =>{
    const listaProductosPedido = await ModeloProductosPedido.findAll();
    
    if(listaProductosPedido.length == 0){
        res.send("No existen productos de pedido en la base");
    }
    else{
        res.json(listaProductosPedido);
    }
};

exports.guardar = async (req, res) =>{
    const{idProducto, cantidad} = req.body;

    if(!idProducto)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloProductosPedido.create({
            idProducto: idProducto,
            cantidad: cantidad,
        })
        .then((data)=>{
            console.log(data);
            res.send("Registro almacenado correctamente...");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos...");
        });
    }
};

exports.modificarCantidad = async (req, res) =>{
    const {idProductosPedido} = req.query;
    const{cantidad} = req.body;

    if (!cantidad) {
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarProductosPedido = await ModeloProductosPedido.findOne({
            where:{
                idProductosPedido: idProductosPedido
            }
        });

        if (!buscarProductosPedido) {
            res.send("El id no existe");
        }
        else{
            buscarProductosPedido.cantidad = cantidad;
            buscarProductosPedido.save()

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

// exports.eliminar = async (req, res) =>{
//     const {idProductosPedido} = req.query;

//     if (!idProductosPedido) {
//         res.send("Por favor escriba el dato a eliminar...");
//     }
//     else{
//         await ModeloProductosPedido.destroy({
//             where:{
//                 idProductosPedido: idProductosPedido
//             }
//         })
//         .then((data) => {
//             console.log(data);

//             if (data == 0) {
//                 res.send("El id no existe");
//             }
//             else
//             {
//                 res.send("Registro eliminado...");
//             }
//         })
//         .catch((error)=>{
//             console.log(error);
//             res.send("Error al eliminar el registro...");
//         });
//     }
// };