const modeloCombo = require('../modelos/modeloCombo');

exports.inicio = async (req, res) =>{
    msj("Estas en el inicio de productos");
};

exports.listarCombos = async (req, res) =>{
    const listaCombo = await modeloCombo.findAll();
    
    if(listaCombo.length == 0){
        msj("No existen combos en la base");
    }
    else{
        res.json(listaCombo);
    }
};

exports.guardar = async (req, res) =>{
    const{nombre, precio, imagen, detalle, categoria, idProductosCombo} = req.body;

    if(!nombre || !precio || !idProductosCombo || !categoria)
    {
        msj("Debe enviar los datos que se solicitan");
    }
    else{
        await modeloCombo.create({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            detalle: detalle,
            categoria: categoria,
            idProductosCombo: idProductosCombo
        })
        .then((data)=>{
            console.log(data);
            msj("Registro almacenado correctamente...");
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al guardar los datos...");
        });
    }
};  

exports.modificar = async (req, res) =>{
    const {idCombo} = req.query;
    const {nombre, precio, imagen, detalle, categoria, idProductosCombo} = req.body;

    if (!idCombo || !nombre || !precio|| !categoria || !idProductosCombo)
    {
        msj("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarCombo = await modeloCombo.findOne({
            where:{
                idCombo: idCombo
            }
        });

        if (!buscarCombo) {
            msj("El id no existe");
        }
        else{
            buscarCombo.nombre = nombre;
            buscarCombo.precio = precio;
            buscarCombo.imagen = imagen;
            buscarCombo.detalle = detalle;
            buscarCombo.categoria = categoria;
            buscarCombo.idProductosCombo = idProductosCombo;
            buscarCombo.save()

            .then((data) => {
                console.log(data);
                msj("Registro actualizado y guardado...");
            })
            .catch((error)=>{
                console.log(error);
                msj("Error al modificar los datos...");
            });
        }
    }
};


exports.eliminar = async (req, res) =>{
    const {idCombo} = req.query;

    if (!idCombo)
    {
        msj("Por favor envíe los datos para la eliminacion...");
    }
    else{
        var buscarCombo = await modeloCombo.findOne({
            where:{
                idCombo: idCombo
            }
        });

        if (!buscarCombo) {
            msj("El id no existe");
        }
        else{
            buscarCombo.estado = 'inactivo';
            buscarCombo.save()

            .then((data) => {
                console.log(data);
                msj("Registro eliminado...");
            })
            .catch((error)=>{
                console.log(error);
                msj("Error al modificar los datos...");
            });
        }
    }
};