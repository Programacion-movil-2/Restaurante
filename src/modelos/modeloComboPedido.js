const sequelize = require('sequelize');
const db = require('../configuracion/db');

//Definimos los campos de las tablas
const ComboPedido = db.define(
    "combospedido",
    {
        idCombos:{
            type: sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        idCombo:{
            type: sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        cantidad:{
            type: sequelize.INTEGER,
            allowNull: true,
        },
    },

    {
        tableName: "combospedido",
        timestamps: false,
    }
);

//Exportamos este modelo
module.exports = ComboPedido;