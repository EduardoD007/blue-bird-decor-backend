const { json } = require("sequelize");

class Controller {
  constructor(services) {
    this.services = services;
  }
  async pegaTodos(req, res) {
    const where = req.query;
    try {
      const listaDeRegistros = await this.services.pegaTodosOsRegistros(where);
      return res.status(200).json(listaDeRegistros);
    } catch (error) {
      res.status(500).json({ error: `${error.message} - Erro ao buscar os registros` });
    }
  }

  async pegaUmRegistro(req, res) {
    try {
      const { id } = req.params;
      const listaUmRegistro = await this.services.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(listaUmRegistro);
    } catch (error) {
      res.status(500).json({ error: `${error.message} - Erro ao buscar o registro` });
    }
  }
  async inseriRegistro(req, res) {
    const novoRegistro = req.body; 
    try {
      const registroCriado = await this.services.criaRegistro(novoRegistro);
      return res.status(200).json(registroCriado);
    } catch (error) {
      res.status(500).json({ error: `${error.message} - Falha ao criar novo registro` })
    }
  }
  async atualiza(req, res) { 
    console.log(req.params)
    console.log(req.body)
    const { id } = req.params;
    const dadosAtualizar = req.body;
    try {
      const registroAtualizado = await this.services.atualizaRegistro(dadosAtualizar, Number(id));
      if (!registroAtualizado) {
        return res.status(500).json({ message: 'Registro não foi atualizado' });
      }
      return res.status(200).json({ message: 'Registro atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: `${error.message} - Falha ao atualizar novo registro` })
    }
  }
  async exclui(req, res) {
    const { id } = req.params;

    try {
      await this.services.excluiRegistro(id);
      return  res.status(200).json({ message: `O registro ${id} foi excluído com sucesso` });
    } catch (error) {
      return res.status(500).json({ message: `${error.message} - Falha ao excluir registro` });
    }
  }
}

module.exports = Controller;