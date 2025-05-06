'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      Produto.belongsTo(models.CategoriaProduto, {
        foreignKey: 'categoria_id',
        DataTypes: Number(DataTypes.STRING),
      });
      Produto.belongsTo(models.SubcategoriaProduto, {
        foreignKey: 'subcategoria_id',
        DataTypes: Number(DataTypes.STRING),
      });
      Produto.belongsTo(models.Fornecedor, {
        foreignKey: 'fornecedor_id',
        DataTypes: Number(DataTypes.STRING),
      });
    }
  }
  Produto.init({
    descricao: DataTypes.STRING,
    referencia: DataTypes.STRING,
    unidade_medida: DataTypes.STRING,
    largura: Number(DataTypes.STRING),
    custo: Number(DataTypes.NUMBER),
    venda: Number(DataTypes.NUMBER)
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos',
    scopes: {
      porFornecedor(id) {
        return {
          where: {
            fornecedor_id : id,
          }
        }
      },
      porCategoriaESubcategoria(categoriaId,subcategoriaId) {
        if (subcategoriaId == "Escolha") {
          return {
            where: {
              categoria_id : categoriaId,
            }
          }
        }else {
          return {
            where: {
              subcategoria_id : subcategoriaId
            }
          }
        }
      },
      porCategoria(categoriaId){
        return {
          where: {
            categoria_id : categoriaId
          }
        }      
      }
    },
  });
  return Produto;
};