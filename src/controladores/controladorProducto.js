const ModeloProducto = require('../modelos/modeloProducto');

exports.inicio = async (req, res) =>{
    res.send("Estas en el inicio de productos");
};

exports.listarProductos = async (req, res) =>{
    const listaProductos = await ModeloProducto.findAll();
    
    if(listaProductos.length == 0){
        res.send("No existen productos en la base");
    }
    else{
        res.json(listaProductos);
    }
};

exports.guardar = async (req, res) =>{
    const{nombre, precio, imagen, descripcion, idTipoProducto} = req.body;

    if(!nombre || !precio || !idTipoProducto)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await ModeloProducto.create({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            descripcion: descripcion,
            idTipoProducto: idTipoProducto
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
    const {idProducto} = req.query;
    const {nombre, precio, imagen, descripcion, idTipoProducto} = req.body;

    if (!idProducto || !nombre || !precio|| !idTipoProducto)
    {
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarProducto = await ModeloProducto.findOne({
            where:{
                idProducto: idProducto
            }
        });

        if (!buscarProducto) {
            res.send("El id no existe");
        }
        else{
            buscarProducto.nombre = nombre;
            buscarProducto.precio = precio;
            buscarProducto.imagen = imagen;
            buscarProducto.descripcion = descripcion;
            buscarProducto.idTipoProducto = idTipoProducto;
            buscarProducto.save()

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
    const {idProducto} = req.query;

    if (!idProducto)
    {
        res.send("Por favor envíe los datos para la eliminacion...");
    }
    else{
        var buscarProducto = await ModeloProducto.findOne({
            where:{
                idProducto: idProducto
            }
        });

        if (!buscarProducto) {
            res.send("El id no existe");
        }
        else{
            buscarProducto.estado = 'inactivo';
            buscarProducto.save()

            .then((data) => {
                console.log(data);
                res.send("Registro eliminado...");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al modificar los datos...");
            });
        }
    }
};