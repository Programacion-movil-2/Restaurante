const ModeloProducto = require('../modelos/modeloProducto');
const msj = require('../componentes/mensaje');

exports.inicio = async (req, res) => {
    msj("Estas en el inicio de productos", 200, [], res);
};

exports.listarProductos = async (req, res) => {
    const listaProductos = await ModeloProducto.findAll({
        where: {
            estado: 'activo'
        }
    });

    if (listaProductos.length == 0) {
        msj("No existen productos en la base", 200, [], res);
    }
    else {
        res.json(listaProductos);
    }
};

exports.guardar = async (req, res) => {
    const { nombre, precio, imagen, descripcion, idTipoProducto } = req.body;

    if (!nombre || !precio || !idTipoProducto) {
        msj("Debe enviar los datos que se solicitan", 200, [], res);
    }
    else {
        await ModeloProducto.create({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            descripcion: descripcion,
            idTipoProducto: idTipoProducto
        })
            .then((data) => {
                console.log(data);
                msj("Registro almacenado correctamente...", 200, [], res);
            })
            .catch((error) => {
                console.log(error);
                msj("Error al guardar los datos...", 200, [], res);
            });
    }
};

exports.modificar = async (req, res) => {
    const { idProducto } = req.query;
    const { nombre, precio, imagen, descripcion, idTipoProducto } = req.body;

    if (!idProducto || !idTipoProducto) {
        msj("Por favor envíe los datos para la actualización...", 200, [], res);
    }
    else {
        var buscarProducto = await ModeloProducto.findOne({
            where: {
                idProducto: idProducto
            }
        });

        if (!buscarProducto) {
            msj("El id no existe", 200, [], res);
        }
        else {
            buscarProducto.nombre = nombre;
            buscarProducto.precio = precio;
            buscarProducto.imagen = imagen;
            buscarProducto.descripcion = descripcion;
            buscarProducto.idTipoProducto = idTipoProducto;
            buscarProducto.save()

                .then((data) => {
                    console.log(data);
                    msj("Registro actualizado y guardado...", 200, [], res);
                })
                .catch((error) => {
                    console.log(error);
                    msj("Error al modificar los datos...", 200, [], res);
                });
        }
    }
};


exports.eliminar = async (req, res) => {
    const { idProducto } = req.query;

    if (!idProducto) {
        msj("Por favor envíe los datos para la eliminacion...", 200, [], res);
    }
    else {
        var buscarProducto = await ModeloProducto.findOne({
            where: {
                idProducto: idProducto
            }
        });

        if (!buscarProducto) {
            msj("El id no existe", 200, [], res);
        }
        else {
            buscarProducto.estado = 'inactivo';
            buscarProducto.save()

                .then((data) => {
                    console.log(data);
                    msj("Registro eliminado...", 200, [], res);
                })
                .catch((error) => {
                    console.log(error);
                    msj("Error al modificar los datos...", 200, [], res);
                });
        }
    }
};
exports.listarProductosPorTipo = async (req, res) => {
    const { idTipoProducto } = req.query;

    if (!idTipoProducto) {
        msj("Por favor envíe los datos", 200, [], res);
    }
    else {
        const listaProductosTipo = await ModeloProducto.findAll({
            where: {
                estado: 'activo',
                idTipoProducto:idTipoProducto
            }
        });

        if (listaProductosTipo.length == 0) {
            msj("No existen productos en la base", 200, [], res);
        }
        else {
            res.json(listaProductosTipo);
        }
    }
};
