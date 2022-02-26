const sequelize = require('sequelize');
const db = require('../configuracion/db');
 
//Definimos los campos de las tablas
const ProductosPedido = db.define(
   "productosPedido",
   {
       idProductosPedido:{
           type: sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
       },
 
       idProducto:{
        type: sequelize.INTEGER,
           primaryKey: true,
           allowNull: false,
       },
     
       cantidad:{
           type: sequelize.INTEGER,
           allowNull: false,
       },
   },
 
   {
       tableName: "productospedido",
       timestamps: false,
   }
);
 
//Exportamos este modelo
module.exports = ProductosPedido;