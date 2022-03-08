const sequelize = require('sequelize');
const db = require('../configuracion/db');
 
//Definimos los campos de las tablas
const ProductosCombo = db.define(
   "productosCombo",
   {
        idProductosCombo:{
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
       estado:{
           type: sequelize.ENUM('activo','inactivo'),
           allowNull:true,
           default: 'activo'
       }
   },
   
 
   {
       tableName: "productoscombo",
       timestamps: false,
   }
);
 
//Exportamos este modelo
module.exports = ProductosCombo;