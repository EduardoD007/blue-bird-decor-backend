const { Router } = require('express');
const ProdutoController = require ('../controllers/ProdutoController.js');

const produtoController = new ProdutoController();

const router = new Router();

router.get('/produtos',(req, res) => produtoController.pegaTodos(req, res));
router.get('/produtos/semMudar',(req, res) => produtoController.pegaTodosSemMudar(req, res));
router.get('/produtos/:id',(req, res) => produtoController.pegaUmRegistro(req, res));
router.get('/produtos/:fornecedorId/buscaFornecedor',(req, res) => produtoController.buscaFornecedorPorEscopo(req, res));
router.get('/produtos/:categoriaId/:subcategoriaId/buscaCategoria',(req, res) => produtoController.buscaCategoriaPorEscopo(req, res));
router.post('/produtos',(req, res) => produtoController.inseriRegistro(req, res));
router.patch('/produtos/:id',(req, res) => produtoController.atualiza(req, res));
router.delete('/produtos/:id',(req, res) => produtoController.exclui(req, res));

module.exports = router;