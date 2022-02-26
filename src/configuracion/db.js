const sequelize = require('sequelize');
const db = new sequelize(
    'dbportalesrestaurant', //nombre de la base de datos
    'root', //usuario de la base de datos
    'root', //contraseña de la base de datos

    {
        host: 'localhost',//servidor
        dialect: 'mysql',
        port: '3306',
    }
);
module.exports = db;