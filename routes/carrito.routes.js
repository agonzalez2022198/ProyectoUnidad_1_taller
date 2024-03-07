const { Router } = require('express');
const { check } = require('express-validator');


const {validarCampos} = require('../middlewares');

const {
    carritoGet,
    putCarrito,
    carritoDelete,
    postCarrito, addToCart, updateCarrito
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


router.post('/cart/add',
    [
        check("productoName", "No puede estar vacío").not().isEmpty(),
        //check("quantity", "No puede estar vacio"),
        validarCampos
    ],
    addToCart
);

router.put('/update/:id',
    [
        check("productos", "No puede estar vacío").not().isEmpty(),
        validarCampos
    ],
    updateCarrito
);


module.exports = router;