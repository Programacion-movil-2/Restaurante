const sequelize = require('sequelize');
const db = require('../configuracion/db');

//Definimos los campos de las tablas
const Persona = db.define(
    "persona",
    {
        idPersona:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        nombre:{
            type: sequelize.STRING(45),
            allowNull: false,
        },

        apellido:{
            type: sequelize.STRING(45),
            allowNull: false,
        },

        telefono:{
            type: sequelize.STRING(45),
            allowNull: true,
        },

        direccion:{
            type: sequelize.BOOLEAN,
            allowNull: true, //permite nulos
            default: true,
        },
       
    },

    {
        tableName: "personas",
        timestamps: false,
    }
);

//Exportamos este modelo
module.exports = Persona;