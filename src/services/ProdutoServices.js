const Services = require ('./Services.js');

class ProdutoServices extends Services {
  constructor() {
    super('Produto');
  }

  async pegaFornecedorEscopo(fornecedorId) {
    const listaProdutos = await super.pegaRegistroPorEscopo({method:['porFornecedor', fornecedorId]});
    return listaProdutos;
  }

  async pegaCategoriaESubcategoriaEscopo(categoriaId, subcategoriaId) {
    const listadeProdutos = await super.pegaRegistroPorEscopo({method:['porCategoriaESubcategoria', categoriaId, subcategoriaId]})
    return listadeProdutos;
  }

  async pegaCategoriaEscopo(categoriaId) {
    const listaCategorias = await super.pegaRegistroPorEscopo({method : ['porCategoria', categoriaId]});
    return listaCategorias;
  }
}

module.exports = ProdutoServices;