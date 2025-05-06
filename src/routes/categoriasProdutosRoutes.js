const { Router } = require('express');
const CategoriaProdutoController = require ('../controllers/CategoriaProdutoController.js');
const SubcategoriaProdutoController = require ('../controllers/SubcategoriaProdutoController.js')

const categoriaProdutoController = new CategoriaProdutoController();
const subCategoriaProdutoController =new SubcategoriaProdutoController();

const router = new Router();

router.get('/categoria_produtos',(req, res) => categoriaProdutoController.pegaTodos(req, res));
router.get('/categoria_produtos/:id',(req, res) => categoriaProdutoController.pegaUmRegistro(req, res));
router.post('/categoria_produtos',(req, res) => categoriaProdutoController.inseriRegistro(req, res));
router.put('/categoria_produtos/:id',(req, res) => categoriaProdutoController.atualiza(req, res));
router.delete('/categoria_produtos/:id',(req, res) => categoriaProdutoController.exclui(req, res));

router.get('/categoria_produtos/:categoriaId/subcategorias', (req, res) => categoriaProdutoController.pegarSubcategorias(req,res));
router.post('/categoria_produtos/subcategorias', (req, res) => subCategoriaProdutoController.inseriRegistro(req, res));

module.exports = router;