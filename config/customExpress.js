const express = require('express');
const consign = require('consign');
module.exports = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  consign()
    .include('routers')
    .then('libs/estrategias-autenticacao.js')
    .into(app);

  return app;
};
