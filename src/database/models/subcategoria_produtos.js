'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubcategoriaProduto extends Model {
    static associate(models) {
      SubcategoriaProduto.belongsTo(models.CategoriaProduto, {
        foreignKey: 'categoria_id'
      });
      SubcategoriaProduto.hasMany(models.Produto, {
        foreignKey: 'subcategoria_id'
      })
    }
  }
  SubcategoriaProduto.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubcategoriaProduto',
    tableName: 'subcategoria_produtos',
  });
  return SubcategoriaProduto;
};