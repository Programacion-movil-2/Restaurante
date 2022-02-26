//Definición de variables importantes
const express = require('express');
const morgan = require('morgan');


//Las variables de entorno deben estar definidas antes de todo
require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('json spaces', 2);
<<<<<<< HEAD
app.use('/api/pedidos/', require('./rutas/rutaPedidos'));
//Aperturo el puerto donde iniciará
=======
app.use('/api/', require('./rutas'));
app.use('/api/productos/', require('./rutas/rutaProducto'));
app.use('/api/tipoProductos/', require('./rutas/rutaTipoProducto'));


>>>>>>> fea53a0de14021d9b97488f21d70c796c9217c95
app.listen(5000, () =>{
    console.log("Servidor iniciado en el puerto 5000");
})

//localhost:5000/api/productos