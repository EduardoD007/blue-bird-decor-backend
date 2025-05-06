const {Router} = require ('express');
const SubcategoriaProdutoController = require ('../controllers/SubcategoriaProdutoController.js');


const subcategoriaProdutoController = new SubcategoriaProdutoController();
const router = Router();

router.get('/subcategorias',(req, res) => subcategoriaProdutoController.pegaTodos(req, res));
router.delete('/subcategorias/:id',(req, res) => subcategoriaProdutoController.exclui(req, res));

module.exports = router;