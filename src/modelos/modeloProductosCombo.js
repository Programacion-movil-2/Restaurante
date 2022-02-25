const sequelize = require('sequelize');
const db = require('../configuracion/db');
 
//Definimos los campos de las tablas
const ProductosCombo = db.define(
   "productosCombo",
   {
       idTipoProducto:{
           type: sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
       },
 
       idProducto:{
           type: sequelize.INTEGER,
           allowNull: false,
       },
     
       cantidad:{
           type: sequelize.INTEGER,
           allowNull: false,
       },
   },
 
   {
       tableName: "productosCombo",
       timestamps: false,
   }
);
 
//Exportamos este modelo
module.exports = ProductosCombo;