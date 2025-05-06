'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoria_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {model: 'categoria_produtos', key: 'id'}
      },
      subcategoria_id: {
        type: Sequelize.INTEGER,
        references: {model: 'subcategoria_produtos', key:'id'}
      },
      fornecedor_id: {
        allowNull: true, 
        type: Sequelize.INTEGER,
        references: {model: 'fornecedores', key: 'id'}
      },
      descricao: {
        type: Sequelize.STRING
      },
      referencia: {
        type: Sequelize.STRING
      },
      unidade_medida: {
        type: Sequelize.STRING
      },
      largura: {
        type: Sequelize.NUMBER
      },
      custo: {
        type: Sequelize.NUMBER
      },
      venda: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('produtos');
  }
};