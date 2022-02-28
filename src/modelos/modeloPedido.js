const sequelize = require('sequelize');
const db = require('../configuracion/db');

//Definimos los campos de las tablas
const Pedido = db.define(
    "pedido",
    {
        idPedido:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        direccionEntrega:{
            type: sequelize.STRING(250),
            allowNull: false,
        },

        subtotal:{
            type: sequelize.DOUBLE,
            allowNull: true,
        },

        idCombos:{
            type: sequelize.INTEGER,
            allowNull: true,
        },

        nombreUsuario:{
            type: sequelize.STRING(45),
            allowNull: false,
        },

        idProductosPedido:{
            type: sequelize.INTEGER,
            allowNull: false,
        }
       
    },

    {
        tableName: "pedido",
        timestamps: false,
    }
);

//Exportamos este modelo
module.exports = Pedido;