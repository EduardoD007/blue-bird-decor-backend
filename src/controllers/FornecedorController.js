const Controller = require ('./Controller.js');
const FornecedorServices = require('../services/FornecedorServices.js');

const fornecedorServices = new FornecedorServices();

class FornecedorController extends Controller {
  constructor() {
    super(fornecedorServices);
  }
}

module.exports = FornecedorController;