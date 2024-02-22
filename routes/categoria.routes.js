const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos} = require('../middlewares');

const { categoriasGet, getCategoriasById, putCategorias, 
    categoriaDelete, categoriaPost } = require('../controllers/categoria.controller');

const { existeCategoriaById } = require('../helpers/db-validator');