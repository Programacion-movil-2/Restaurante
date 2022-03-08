const modeloComboPedido = require('../modelos/modeloComboPedido');
exports.inicioCombosPedido = async (req, res) =>{
    res.send("Estas en el inicio de combosPedido");
};

exports.listarComboPedido = async (req, res) =>{
    const listaComboPedido = await modeloComboPedido.findAll();
    
    if(listaComboPedido.length == 0){
        res.send("No existen combos pedidos en la base");
    }
    else{
        res.json(listaComboPedido);
    }
};

/*-------------------------------------------------CRUD----------------------------------------*/
exports.guardarComboPedido = async (req, res) =>{
    const{idCombos, idCombo,cantidad} = req.body; 
    if(!idCombos || !idCombo || !cantidad)
    {
        res.send("Debe enviar los datos que se solicitan");
    }
    else{
        await modeloComboPedido.create({
            idCombos: idCombos,
            idCombo: idCombo,
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
exports.modificarComboPedido = async (req, res) =>{
    const {idCombos} = req.query;
    const{idCombo,cantidad} = req.body; 

    if(!idCombos || !idCombo || !cantidad){
        res.send("Por favor envíe los datos para la actualización...");
    }
    else{
        var buscarComboPedido = await modeloComboPedido.findOne({
            //Le digo cual es el dato que comparará
            where:{
                idCombos: idCombos
            }
        });

        //Validar si está null el campo
        if (!buscarComboPedido) {
            res.send("El id no existe");
        }
        else{
            buscarComboPedido.idCombos = idCombos;
            buscarComboPedido.idCombo = idCombo;
            buscarComboPedido.cantidad = cantidad;
            buscarComboPedido.save()

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
exports.eliminarComboPedido = async (req, res) =>{
    const {idCombos} = req.query;

    //Validamos que nos esten enviando los datos
    if (!idCombos) {
        //Mostramos mensaje al usuario
        res.send("Por favor escriba el dato a eliminar...");
    }
    else{
        await modeloComboPedido.destroy({
            where:{
                idCombos: idCombos
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