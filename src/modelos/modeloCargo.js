const sequelize = require('sequelize');
const db = require('../configuracion/db');

//Definimos los campos de las tablas
const Cargo = db.define(
    "cargo",
    {
        idCargos:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        nombreCargo:{
            type: sequelize.STRING(45),
            allowNull: false,
        },
       
    },

    {
        tableName: "cargos",
        timestamps: false,
    }
);

//Exportamos este modelo
module.exports = Cargo;