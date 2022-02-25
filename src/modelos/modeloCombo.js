const sequelize = require('sequelize');
const db = require('../configuracion/db');

//Definimos los campos de las tablas
const Combo = db.define(
    "combo",
    {
        idCombo:{
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

        detalle:{
            type: sequelize.STRING(250),
            allowNull: true, //permite nulos
        },
        
        categoria:{
            type: sequelize.ENUM('dos', 'tres', 'familiar'),
            allowNull: false, //permite nulos
        },

        idProductosCombo:{
            type: sequelize.INTEGER,
            allowNull: false, //permite nulos

        },
    },

    {
        tableName: "combo",
        timestamps: false,
    }
);

//Exportamos este modelo
module.exports = Combo;