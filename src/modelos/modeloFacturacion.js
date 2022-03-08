const sequelize = require('sequelize');
const db = require('../configuracion/db');

//Definimos los campos de las tablas
const Facturacion = db.define(
    "facturacion",
    {
        idFactura:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        isv:{
            type: sequelize.DOUBLE,
            default: "0.5",
            allowNull: false,
        },

        total:{
            type: sequelize.DOUBLE,
            allowNull: false,
        },

        fecha:{
            type: sequelize.DATE,
            allowNull: true,
        },

        idPedido:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
       
    },

    {
        tableName: "facturacion",
        timestamps: false,
    }
);

//Exportamos este modelo
module.exports = Facturacion;