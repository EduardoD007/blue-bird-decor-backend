const dataSource = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll({where: {...where}});
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaRegistroPorEscopo(escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  async criaRegistro(novoRegistro) {
    return dataSource[this.model].create(novoRegistro);
  }

  async atualizaRegistro(dadosNovos, id) {
    console.log(id)
    const dadosAtualizados = dataSource[this.model].update(dadosNovos, {
      where: {id:id}
    });
    if(dadosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(id) {
    return dataSource[this.model].destroy({where: {id:id}});
  }
}

module.exports = Services;