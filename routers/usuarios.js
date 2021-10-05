const { session } = require('passport');
const passport = require('passport');
const UsuarioController = require('../controllers/UsuarioController');
const middlewaresAutenticacao = require('../libs/middlewares-autenticacao');
const cors = require('cors');

module.exports = (app) => {
  //app.get(cors({ allowedHeaders: 'Content-Type,Authorization' }));
  app.use(cors({ origin: 'http://localhost:3001' }));

  app.post(
    '/usuarios/login',
    //middlewaresAutenticacao.local,
    UsuarioController.login,
  );

  app.get(
    '/usuarios',
    middlewaresAutenticacao.bearer,
    UsuarioController.findAll,
  );
  app.get('/usuarios/:id', UsuarioController.findByID);
  app.post('/usuarios', UsuarioController.criar);
  app.put('/usuarios/:id', UsuarioController.atualizar);
  app.delete('/usuarios/:id', UsuarioController.apagar);
};
