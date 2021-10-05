const database = require('../models');
class PostController {
  static async findAll(req, res) {
    try {
      const posts = await database.Posts.findAll();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async findByID(req, res) {
    const { id } = req.params;
    try {
      const post = await database.Posts.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criar(req, res) {
    const dados = req.body;
    try {
      const post = await database.Posts.create(dados);
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    try {
      await database.Posts.update(dados, {
        where: { id: Number(id) },
        individualHooks: true,
      });
      const post = await database.Posts.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagar(req, res) {
    const { id } = req.params;
    try {
      await database.Posts.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `post ${id} apagado!` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = PostController;
