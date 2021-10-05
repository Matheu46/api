const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');

const { Usuarios } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'senha',
        session: false,
      },
      async (email, senha, done) => {
        try {
          const usuario = await Usuarios.findOne({ where: { email: email } });
          if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return done(null, false, {
              message: 'usuário ou senha incorretos!',
            });
          }
          return done(null, usuario);
        } catch (erro) {
          return done(erro);
        }
      },
    ),
  );

  passport.use(
    new BearerStrategy(async (token, done) => {
      try {
        const payload = jwt.verify(token, 'senha secreta');
        const usuario = await Usuarios.findOne({ where: { id: payload.id } });
        done(null, usuario, { token: token });
      } catch (erro) {
        console.log(erro);
        done(erro);
      }
    }),
  );
};
