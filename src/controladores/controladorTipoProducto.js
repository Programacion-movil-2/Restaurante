const ModeloTipoProducto = require('../modelos/modeloTipoProducto');
const msj = require('../componentes/mensaje');

exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de tipos de productos");
};

exports.listarTiposProductos = async (req, res) =>{
    const listaTipoProducto = await ModeloTipoProducto.findAll();
    
    if(listaTipoProducto.length == 0){
        msj("No existen tipos de productos en la base", 200, [], res);
    }
    else{
        res.json(listaTipoProducto);
    }
};

exports.guardar = async (req, res) =>{
    const{nombre, idTipoPrincipal} = req.body;

    if(!nombre)
    {
        msj("Debe enviar los datos que se solicitan", 200, [], res);
    }
    else{
        await ModeloTipoProducto.create({
            nombre: nombre,
            idTipoPrincipal: idTipoPrincipal,
        })
        .then((data)=>{
            console.log(data);
            msj("Registro almacenado correctamente...", 200, [], res);
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al guardar los datos...", 200, [], res);
        });
    }
};

exports.modificar = async (req, res) =>{
    const {idTipoProducto} = req.query;
    const{nombre, idTipoPrincipal} = req.body;

    if (!idTipoProducto || !nombre) {
        msj("Por favor envíe los datos para la actualización...", 200, [], res);
    }
    else{
        var buscarTipoProducto = await ModeloTipoProducto.findOne({
            where:{
                idTipoProducto: idTipoProducto
            }
        });

        if (!buscarTipoProducto) {
            msj("El id no existe", 200, [], res);
        }
        else{
            buscarTipoProducto.nombre = nombre;
            buscarTipoProducto.idTipoPrincipal = idTipoPrincipal;
            buscarTipoProducto.save()

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

exports.eliminar = async (req, res) =>{
    const {idTipoProducto} = req.query;

    if (!idTipoProducto) {
        msj("Por favor escriba el dato a eliminar...", 200, [], res);
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

exports.listarTipo = async (req, res) => {
    const { idTipoProducto } = req.query;

    if (!idTipoProducto) {
        msj("Por favor envíe los datos", 200, [], res);
    }
    else {
        const tipo = await ModeloTipoProducto.findOne({
            where: {
               
                idTipoProducto:idTipoProducto
            }
        });

        if (tipo.length == 0) {
            msj("No existen productos en la base", 200, [], res);
        }
        else {
            res.json(tipo);
        }
    }
};