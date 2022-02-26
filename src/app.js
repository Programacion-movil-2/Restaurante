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
//Aperturo el puerto donde iniciará
app.listen(5000, () =>{
    console.log("Servidor iniciado en el puerto 5000");
})