const ModeloTipoProducto = require('../modelos/modeloTipoProducto');

exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de tipos de productos");
};

exports.listarTiposProductos = async (req, res) =>{
    const listaTipoProducto = await ModeloTipoProducto.findAll();
    
    if(listaTipoProducto.length == 0){
        res.send("No existen tipos de productos en la base");
    }
    else{
        res.json(listaTipoProducto);
    }
};

exports.guardar = async (req, res) =>{
    const{nombre, idTipoPrincipal} = req.body;

    if(!nombre)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloTipoProducto.create({
            nombre: nombre,
            idTipoPrincipal: idTipoPrincipal,
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

exports.modificar = async (req, res) =>{
    const {idTipoProducto} = req.query;
    const{nombre, idTipoPrincipal} = req.body;

    if (!idTipoProducto || !nombre) {
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarTipoProducto = await ModeloTipoProducto.findOne({
            where:{
                idTipoProducto: idTipoProducto
            }
        });

        if (!buscarTipoProducto) {
            res.send("El id no existe");
        }
        else{
            buscarTipoProducto.nombre = nombre;
            buscarTipoProducto.idTipoPrincipal = idTipoPrincipal;
            buscarTipoProducto.save()

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

exports.eliminar = async (req, res) =>{
    const {idTipoProducto} = req.query;

    if (!idTipoProducto) {
        res.send("Por favor escriba el dato a eliminar...");
    }
    else{
        await ModeloTipoProducto.destroy({
            where:{
                idTipoProducto: idTipoProducto
            }
        })
        .then((data) => {
            console.log(data);

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