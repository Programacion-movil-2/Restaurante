const sequelize = require('sequelize');
const db = require('../configuracion/db');
 
//Definimos los campos de las tablas
const TipoProducto = db.define(
   "tipoProducto",
   {
       idTipoProducto:{
           type: sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
       },
 
       nombre:{
           type: sequelize.STRING(45),
           allowNull: false,
       },
     
       idTipoPrincipal:{
           type: sequelize.INTEGER,
           allowNull: true,
       },
       
       imagen:{
        type: sequelize.STRING(250),
        allowNull: true
    },
   },
 
   {
       tableName: "tipoproducto",
       timestamps: false,
   }
);
 
//Exportamos este modelo
module.exports = TipoProducto;