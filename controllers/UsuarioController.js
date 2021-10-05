const database = require('../models');
const jwt = require('jsonwebtoken');
class UsuarioController {
  static login(req, res) {
    const token = jwt.sign(
      { id: req.usuario.id }, //payload
      'senha secreta',
      { expiresIn: '15m' },
    );
    res.set('Authorization', token);
    return res.status(204).send();
  }

  static async findAll(req, res) {
    try {
      const usuarios = await database.Usuarios.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findByID(req, res) {
    const { id } = req.params;
    try {
      const usuario = await database.Usuarios.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criar(req, res) {
    const dados = req.body;
    try {
      const usuario = await database.Usuarios.create(dados);
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    try {
      await database.Usuarios.update(dados, {
        where: { id: Number(id) },
        individualHooks: true,
      });
      const usuario = await database.Usuarios.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagar(req, res) {
    const { id } = req.params;
    try {
      await database.Usuarios.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `usuário ${id} apagado!` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UsuarioController;
