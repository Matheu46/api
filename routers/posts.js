const { session } = require('passport');
const passport = require('passport');
const UsuarioController = require('../controllers/PostController');
const middlewaresAutenticacao = require('../libs/middlewares-autenticacao');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors({ origin: 'http://localhost:3001' }));
  app.get('/posts', UsuarioController.findAll);
  app.get('/posts/:id', UsuarioController.findByID);
  app.post('/posts', UsuarioController.criar);
  app.put('/posts/:id', UsuarioController.atualizar);
  app.delete('/posts/:id', UsuarioController.apagar);
};
