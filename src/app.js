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
app.use('/api/', require('./rutas'));
app.use('/api/productos/', require('./rutas/rutaProducto'));
app.use('/api/tipoProductos/', require('./rutas/rutaTipoProducto'));
app.use('/api/usuarios', require('./rutas/rutasUsuario'));
app.use('/api/autenticacion', require('./rutas/rutasAutenticacion'));
app.use('/api/personas/', require('./rutas/rutaPersonas'));
app.use('/api/cargos/', require('./rutas/rutaCargos'));
app.use('/api/facturas/', require('./rutas/rutaFacturas'));
app.use('/api/pedidos/', require('./rutas/rutaPedidos'));
app.use('/api/productosCombo/', require('./rutas/rutaProductosCombo'));
app.use('/api/productosPedido/', require('./rutas/rutaProductosPedido'));

//Aperturo el puerto donde iniciará
app.listen(5000, () =>{
    console.log("Servidor iniciado en el puerto 5000");
})

//localhost:5000/api/productos