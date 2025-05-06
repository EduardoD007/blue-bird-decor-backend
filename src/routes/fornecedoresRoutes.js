const { Router } = require('express');
const FornecedorController = require ('../controllers/FornecedorController.js');

const fornecedorController = new FornecedorController();

const router = new Router();

router.get('/fornecedores',(req, res) => fornecedorController.pegaTodos(req, res));
router.get('/fornecedores/:id',(req, res) => fornecedorController.pegaUmRegistro(req, res));
router.post('/fornecedores',(req, res) => fornecedorController.inseriRegistro(req, res));
router.put('/fornecedores/:id',(req, res) => fornecedorController.atualiza(req, res));
router.delete('/fornecedores/:id',(req, res) => fornecedorController.exclui(req, res));

module.exports = router;