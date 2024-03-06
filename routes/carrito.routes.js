const { Router } = require('express');
const { check } = require('express-validator');


const {validarCampos} = require('../middlewares');

const {
    carritoGet,
    putCarrito,
    carritoDelete,
    postCarrito, addToCart
} = require('../controllers/carrito.controller');

const {existeProductById } = require('../helpers/db-validator');


const router = Router();


/*router.post(
    "/",
    [
        check("productos", "El producto no puede ir vacío").not().isEmpty(),
        check("cantidad", "La cantidad no puede estar vacía").not().isEmpty(),
         validarCampos,
    ],  postCarrito
);*/


router.post('/cart/add', addToCart);


module.exports = router;