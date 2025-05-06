const Controller = require ('./Controller.js');
const SubcategoriaProdutoServices = require('../services/SubcategoriaProdutoServices.js');
const ProdutoServices = require('../services/ProdutoServices.js');
const CategoriaProdutoServices = require('../services/CategoriaProdutoServices.js');

const subcategoriaProdutoServices = new SubcategoriaProdutoServices();
const categoriaProdutoServices = new CategoriaProdutoServices();
const produtoServices = new ProdutoServices();

class SubcategoriaProdutoController extends Controller {
  constructor() {
    super(subcategoriaProdutoServices);
  }

  async exclui(req, res) {
    const { id } = req.params;
    const produtos = await produtoServices.pegaTodosOsRegistros();
    const produtosId = [];

    for(const produto of produtos) {
      produto.subcategoria_id? produtosId.push(produto.subcategoria_id) : null;
    }
    try {
      if(produtosId.includes(Number(id))){
        return res.status(200).json({message: `Existe produto registrado com  a subcategoria ${id} - não é possível fazer a exclusão`})
      }else{
        return await super.exclui(req,res);
      }
    } catch (error) {
      return res.status(500).json({message: `${error.message} - Erro ao excluir subcategoria`})
    }
  }
}



module.exports = SubcategoriaProdutoController;
