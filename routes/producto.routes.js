const { Router } = require('express');
const { check } = require('express-validator');


const {validarCampos, esAdminRole, tieneRolAutorizado} = require('../middlewares');

const {
    productosPost,
    productosGet,
    getProductosById,
    putProductos, productosDelete, postProductos
} = require('../controllers/producto.controller');

const {existeProductById } = require('../helpers/db-validator');

const router = Router();

router.get("/", productosGet);


router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getProductosById),
        validarCampos
    ], getProductosById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getProductosById),
        //check("role").custom(esRoleValido),
        validarCampos
    ], putProductos);

router.post(
    "/",
    [
        check("nameProduct", "El nombre no puede estar vacío").not().isEmpty(),
        check("descripcion", "Debe haber una descripcion").not().isEmpty(),
        check("nombreCategoria", "La categoria no puede estar vacia").not().isEmpty(), // Cambiado a nombreCategoria
        check("precio", "El precio no puede estar vacio").not().isEmpty(),
        check("stock", "El stock no puede estar vacio").not().isEmpty(),
         validarCampos,
    ],  postProductos
);

router.delete(
    "/:id",
    [   
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProductById),
        validarCampos
    ], productosDelete);

module.exports = router;