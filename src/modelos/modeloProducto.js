const sequelize = require('sequelize');
const db = require('../configuracion/db');
 
//Definimos los campos de las tablas
const Producto = db.define(
   "producto",
   {
       idProducto:{
           type: sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
       },
 
       nombre:{
           type: sequelize.STRING(45),
           allowNull: false,
       },
 
       precio:{
           type: sequelize.DOUBLE,
           allowNull: false,
       },
 
       imagen:{
           type: sequelize.STRING(250),
           allowNull: true,
       },
 
       descripcion:{
           type: sequelize.STRING(250),
           allowNull: true
       },
       estado:{
           type: sequelize.ENUM('activo','inactivo'),
           allowNull: true,
           defaultvalue: 'activo'
 
       },
       idTipoProducto:{
           type: sequelize.INTEGER,
           allowNull: false,
       }
     
   },
 
   {
       tableName: "producto",
       timestamps: false,
   }
);
 
//Exportamos este modelo
module.exports = Producto;