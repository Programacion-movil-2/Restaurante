const ModeloProductosCombo = require('../modelos/modeloProductosCombo');
const msj = require('../componentes/mensaje');
exports.inicioProductoCombo = async (req, res) =>{
    msj("Estas en el inicio de productosCombos");
};

exports.listarProductosCombo = async (req, res) =>{
    const listaProductosCombo = await ModeloProductosCombo.findAll();
    
    if(listaProductosCombo.length == 0){
        msj("No existen productos en este combo en la base", 200, [], res);
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
        msj("Debe enviar los datos que se solicitan", 200, [], res);
    }
    else{
        await ModeloProductosCombo.create({
            idProductosCombo: idProductosCombo,
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
exports.modificarProductoCombo = async (req, res) =>{
    const {idProductosCombo} = req.query;
    const{idProducto,cantidad} = req.body; 

    if(!idProductosCombo || !idProducto || !cantidad){
        msj("Por favor envíe los datos para la actualización...", 200, [], res);
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
            msj("El id no existe", 200, [], res);
        }
        else{
            buscarProductosCombo.idProductosCombo = idProductosCombo;
            buscarProductosCombo.idProducto = idProducto;
            buscarProductosCombo.cantidad = cantidad;
            buscarProductosCombo.save()

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
exports.eliminarProductoCombo = async (req, res) =>{
    const {idProductosCombo} = req.query;

    if(!idProductosCombo){
        msj("Por favor envíe los datos para la eliminación...", 200, [], res);
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
            msj("El id no existe", 200, [], res);
        }
        else{
            buscarProductosCombo.estado ='inactivo';
            buscarProductosCombo.save()

            //Mostramos mensaje de verificación
            .then((data) => {
                console.log(data);
                msj("Registro eliminado", 200, [], res);
            })
            .catch((error)=>{
                console.log(error);
                msj("Error al eliminar los datos...", 200, [], res);
            });
        }
    }
};