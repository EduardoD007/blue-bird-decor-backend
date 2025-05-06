const Services = require ('./Services.js');

class CategoriaProdutoServices extends Services {
  constructor() {
    super('CategoriaProduto');
  }

  async buscarSubCategorias(id) {
    const categoria = await super.pegaUmRegistroPorId(id);
    const listaSubcategorias = await categoria.getSubcategorias(); // busca por escopo de modelo
    return (listaSubcategorias);
  }
};

module.exports = CategoriaProdutoServices;