const ModeloProductosCombo = require('../modelos/modeloProductosCombo');
exports.inicioProductoCombo = async (req, res) =>{
    res.send("Estas en el inicio de productosCombos");
};

exports.listarProductosCombo = async (req, res) =>{
    const listaProductosCombo = await ModeloProductosCombo.findAll();
    
    if(listaProductosCombo.length == 0){
        res.send("No existen productos en este combo en la base");
    }
    else{
        res.json(listaProductosCombo);
    }
};

/*-------------------------------------------------CRUD----------------------------------------*/
exports.guardarProductoCombo = async (req, res) =>{
    const{idProductosCombo, idProducto,cantidad} = req.body; 
    if(!idProductosCombo || !idProducto || !cantidad)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloProductosCombo.create({
            idProductosCombo: idProductosCombo,
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
exports.modificarProductoCombo = async (req, res) =>{
    const {idProductosCombo} = req.query;
    const{idProducto,cantidad} = req.body; 

    if(!idProductosCombo || !idProducto || !cantidad){
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarProductosCombo = await ModeloProductosCombo.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idProductosCombo: idProductosCombo
            }
        });

        //Validar si está null el campo
        if (!buscarProductosCombo) {
            res.send("El id no existe");
        }
        else{
            buscarProductosCombo.idProductosCombo = idProductosCombo;
            buscarProductosCombo.idProducto = idProducto;
            buscarProductosCombo.cantidad = cantidad;
            buscarProductosCombo.save()

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
exports.eliminarProductoCombo = async (req, res) =>{
    const {idProductosCombo} = req.query;

    if(!idProductosCombo){
        res.send("Por favor envíe los datos para la eliminación...");
    }
    else{
        var buscarProductosCombo = await ModeloProductosCombo.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idProductosCombo: idProductosCombo
            }
        });

        //Validar si está null el campo
        if (!buscarProductosCombo) {
            res.send("El id no existe");
        }
        else{
            buscarProductosCombo.estado ='inactivo';
            buscarProductosCombo.save()

            //Mostramos mensaje de verificación
            .then((data) => {
                console.log(data);
                res.send("Registro eliminado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar los datos...");
            });
        }
    }
};