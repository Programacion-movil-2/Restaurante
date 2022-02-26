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

app.use('/api/pedidos/', require('./rutas/rutaPedidos'));
app.use('/api/productosCombo/', require('./rutas/rutaProductosCombo'));
app.use('/api/productosPedido/', require('./rutas/rutaProductosPedido'));

//Aperturo el puerto donde iniciará
app.listen(5000, () =>{
    console.log("Servidor iniciado en el puerto 5000");
})

//localhost:5000/api/productos