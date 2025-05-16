const Controller = require ('./Controller.js');
const CategoriaProdutoServices = require ('../services/CategoriaProdutoServices.js');
const SubcategoriaProdutoServices = require('../services/SubcategoriaProdutoServices.js');
const ProdutoServices = require('../services/ProdutoServices.js');

const categoriaProdutoServices = new CategoriaProdutoServices();
const subcategoriaProdutoServies = new SubcategoriaProdutoServices();
const produtoServices = new ProdutoServices();

class CategoriaProdutoController extends Controller {
  constructor() {
    super(categoriaProdutoServices);
  }

  async pegarSubcategorias(req, res) {
    const {categoriaId} = req.params;

    try {
      const listaSubcategorias = await categoriaProdutoServices.buscarSubCategorias(categoriaId);
      return res.status(200).json(listaSubcategorias);

    } catch (error) {
      return res.status(500).json(`${error.message} - Erro ao pegar subcategorias`)
    }
  }

  async exclui(req, res) {
    const {id} = req.params;
    const subcategorias = await categoriaProdutoServices.buscarSubCategorias(id);
    const produtosPorCategoria = await produtoServices.pegaCategoriaEscopo(id);

    try {
      if(subcategorias.length > 0 || produtosPorCategoria.length > 0) {
        var mensagem = '';

        subcategorias.length > 0? mensagem += `A categoria ${id} contém subcategoria cadastrada / `: null ;
        produtosPorCategoria.length > 0? mensagem += `A categoria ${id} contém produtos cadastrados`: null ;
        mensagem += ' - Não foi possível excluir categoria'

        return res.status(200).json({message:mensagem});
        
      }else {
        await categoriaProdutoServices.excluiRegistro(id);
        return res.status(200).json({message: `A categoria ${id} foi excluída com sucesso`})
      }
    } catch (error) {
      return res.status(500).json({message: `${error.message} - Erro ao fazer a exclusão`})

    }
  }
}

module.exports = CategoriaProdutoController;