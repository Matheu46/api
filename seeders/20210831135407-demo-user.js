'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    Example: await queryInterface.bulkInsert(
      'Usuarios',
      [
        {
          nome: 'Matheus',
          email: 'mathias.matheus@ymail.com',
          status: 'ativo',
          perfil: 'funcionario',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Maria',
          email: 'maria@ymail.com',
          status: 'ativo',
          perfil: 'funcionario',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  },
};
