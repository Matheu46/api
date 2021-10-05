'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuarios.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
      perfil: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Usuarios',
    },
  );
  Usuarios.beforeCreate(async (usuario, options) => {
    const senhaHash = await bcrypt.hash(usuario.senha, 12);
    usuario.senha = senhaHash;
  });
  Usuarios.beforeUpdate(async (usuario, options) => {
    const senhaHash = await bcrypt.hash(usuario.senha, 12);
    usuario.senha = senhaHash;
  });

  return Usuarios;
};
