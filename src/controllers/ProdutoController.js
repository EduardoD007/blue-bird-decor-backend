const { Op } = require("sequelize");
const conversorString = require("../utils/conversorDeStringHelper.js");

const Controller = require("./Controller.js");
const ProdutoServices = require("../services/ProdutoServices.js");
const CategoriaProdutoServices = require("../services/CategoriaProdutoServices.js");
const SubcategoriaProdutoServices = require("../services/SubcategoriaProdutoServices.js");
const FornecedorServices = require("../services/FornecedorServices.js");

const produtoServices = new ProdutoServices();
const categoriaProdutoServices = new CategoriaProdutoServices();
const fornecedorServices = new FornecedorServices();
const subCategoriaProdutoServices = new SubcategoriaProdutoServices();

class ProdutoController extends Controller {
  constructor() {
    super(produtoServices);
  }
  async pegaTodos(req, res) {
    const where = req.query;
    const whereConvertida = conversorString(where);
    let produtos;

    try {
      produtos = await produtoServices.pegaTodosOsRegistros(
        whereConvertida
      );
    
    } catch (error) {
      return res.status(500).json({ message: `${error.message} - Erro ao buscar produtos` });
    }

    try {
      const produtosRetornados = await mudarIdParaNome(produtos);
      return res.status(200).json(produtosRetornados);

    } catch (error) {
      return res.status(500).json({ message: `${error.message} - Erro ao buscar produtos` });
    }
  }

  async pegaTodosSemMudar(req, res) {
    const where = req.query;
    const whereConvertida = conversorString(where);

    try {
      const produtos = await produtoServices.pegaTodosOsRegistros(
        whereConvertida
      );
      return res.status(200).json(produtos);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `${error.message} - Erro ao buscar produtos` });
    }
  }

  async pegaUmRegistro(req, res) {
    const { id } = req.params;
    const produto = [];

    try {
      produto[0] = await produtoServices.pegaUmRegistroPorId(id);
      await mudarIdParaNome(produto);
      return res.status(200).json(produto);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `${error.message} - Erro ao buscar produto` });
    }
  }

  async buscaFornecedorPorEscopo(req, res) {
    try {
      const { fornecedorId } = req.params;
      const listaProdutos = await produtoServices.pegaFornecedorEscopo(
        fornecedorId
      );
      await mudarIdParaNome(listaProdutos);
      return res.status(200).json(listaProdutos);
    } catch (error) {
      res
        .status(500)
        .json(`${error.message} - Erro ao buscar fornecedor por escopo`);
    }
  }

  async buscaCategoriaPorEscopo(req, res) {
    const { categoriaId } = req.params;
    const { subcategoriaId } = req.params;

    try {
      const listaProdutos = await produtoServices.pegaCategoriaEscopo(
        categoriaId,
        subcategoriaId
      );
      await mudarIdParaNome(listaProdutos);
      return res.status(200).json(listaProdutos);
    } catch (error) {
      return res
        .status(500)
        .json(`${error.message} - Erro ao buscar por categoria`);
    }
  }
}

async function mudarIdParaNome(listaProdutos) {
  try {
    for (const produto of listaProdutos) {
      
      var categoria = await categoriaProdutoServices.pegaUmRegistroPorId(
        produto.categoria_id
      );
      produto.categoria_id = categoria.nome;

      var fornecedor = await fornecedorServices.pegaUmRegistroPorId(
        produto.fornecedor_id
      );
      produto.fornecedor_id = fornecedor.nome;

      if(produto.subcategoria_id !== null){
        var subcategoria = await subCategoriaProdutoServices.pegaUmRegistroPorId(
        produto.subcategoria_id
      );
      produto.subcategoria_id = subcategoria.nome;
      console.log(subcategoria.nome)
      }
    }
    return listaProdutos;

  } catch (error) {
    return { error: `${error.message} - Erro ao buscar os registros` };
  }
}

module.exports = ProdutoController;
