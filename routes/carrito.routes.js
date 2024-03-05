const { Router } = require('express');
const { check } = require('express-validator');


const {validarCampos} = require('../middlewares');

const {
    carritoGet,
    putCarrito,
    carritoDelete,
    postCarrito
} = require('../controllers/carrito.controller');

const {existeProductById } = require('../helpers/db-validator');


const router = Router();


router.post(
    "/",
    [
        check("productos", "El producto no puede ir vacío").not().isEmpty(),
        check("cantidad", "La cantidad no puede estar vacía").not().isEmpty(),
         validarCampos,
    ],  postCarrito
);


module.exports = router;