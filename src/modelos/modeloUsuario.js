const sequelize = require ('sequelize');
const bcrypt = require('bcrypt');
const db = require('../configuracion/db');
const Usuario = db.define(

    "usuario",{


        nombreUsuario:{

            type: sequelize.STRING(45),
            primaryKey: true,
            allowNull: false,

        },
        contrasena:{

            type: sequelize.STRING(250),
            allowNull: false,

        },    
        pin:{

            type: sequelize.CHAR(4),
            allowNull: true,
            defaultValue: '0000',

        },
        correo:{

            type: sequelize.STRING(250),
            allowNull: false,

        },
        idPersona:{

            type: sequelize.INTEGER,
            allowNull: false,

        },
        estado:{

            type: sequelize.ENUM('activo', 'inactivo'),
            allowNull: true,
            defaultValue: 'activo',

        }
    },
    {
        tableName: "usuario",
        timestamps: false,
        hooks:{

            beforeCreate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasena, 8);
                usuario.contrasena = hash; 
            },
            beforeUpdate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasena, 10);
                usuario.contrasena = hash; 
            }

        }
    }

);
Usuario.prototype.VerificarContrasena = (con, com) =>{

    return bcrypt.compareSync(con, com);

}
module.exports = Usuario;