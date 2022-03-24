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
            defaultvalue: '0.15',
            allowNull: true,
        },

        total:{
            type: sequelize.DOUBLE,
            allowNull: false,
        },

        fecha:{
            type: sequelize.DATE,
            allowNull: false,
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