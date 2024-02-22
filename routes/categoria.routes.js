const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos} = require('../middlewares');

const { categoriasGet, getCategoriasById, putCategorias, 
    categoriaDelete, categoriaPost } = require('../controllers/categoria.controller');

const { existeCategoriaById } = require('../helpers/db-validator');

const router = Router();

router.get("/", categoriasGet);

router.get(
    "/:id",
    [
        check("id", "No es un id valido").isMongoId(),
        check('id').custom(existeCategoriaById),
        validarCampos
    ], getCategoriasById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCategoriaById),
        validarCampos
    ], putCategorias
);

router.post(
    "/",
    [
        check("nombreCat", "El nombre no puede estar vacío").not().isEmpty(),
        check("descripcionCat","La descripcion debe de llevar datos").not().isEmpty(),
        validarCampos,
    ], categoriaPost
);

router.delete(
    "/:id",
    [   
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCategoriaById),
        validarCampos
    ], categoriaDelete
);


module.exports = router;