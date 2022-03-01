const passport = require('passport');
const ModeloUsuario = require('../modelos/modeloUsuario');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duracion = moment.duration(50, "m").asSeconds();
const clave = "MiClaveSegura";
exports.getToken = (data) =>{
    return JWT.sign(data, clave, {expiresIn: duracion});
}
const opciones={};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use(new estrategiaJWT(opciones, async (paylad, done)=>{
    return await ModeloUsuario.findOne({

        where:{
            nombreUsuario: paylad.nombreUsuario,
            estado: 'activo',
        }

    })
    .then((data) => {
        return done(null, data.nombreUsuario);
    }).catch((err) => {
        return done(null, false);
    });
}));
exports.validarAutenticado = passport.authenticate('jwt', {session: false, failureRedirect: '/api/autenticacion/error'},);