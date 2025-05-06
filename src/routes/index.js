const express = require('express');
const categorias = require('./categoriasProdutosRoutes.js');
const fornecedores = require('./fornecedoresRoutes.js');
const produtos = require('./produtosRoutes.js');
const subcategorias = require('./subcategoriasRoutes.js')

module.exports = app => {
  app.use(
    express.json(),
    categorias,
    fornecedores,
    produtos,
    subcategorias
  );
};