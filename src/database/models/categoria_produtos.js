'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoriaProduto extends Model {
    static associate(models) {
      CategoriaProduto.hasMany(models.SubcategoriaProduto, {
        foreignKey: 'categoria_id',
        scope:{},
        as:'subcategorias'
      })
      CategoriaProduto.hasMany(models.Produto, {
        foreignKey: 'categoria_id'
      })
    }
  }
  CategoriaProduto.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoriaProduto',
    tableName: 'categoria_produtos',
  });
  return CategoriaProduto;
};