const { Router } = require('express');
const { check } = require('express-validator');


const {validarCampos} = require('../middlewares');

const {
    facturasGet,
    getFacturasById,
    putFactura,
    facturaDelete,
    facturaPost
} = require('../controllers/factura.controller');

const {existeFacturaId } = require('../helpers/db-validator');

const router = Router();

router.get("/", facturasGet);


router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getFacturasById),
        validarCampos
    ], getFacturasById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getFacturasById),
        //check("role").custom(esRoleValido),
        validarCampos
    ], putFactura);

router.post(
    "/:id",
    [
        check("numeroFactura", "El numero no puede estar vacío").not().isEmpty(),
        check("cliente", "nombre de cliente no puede estar vacio").not().isEmpty(),
        check("detalle", "detalle vacío").not().isEmpty(),
        validarCampos,
    ], facturaPost);

router.delete(
    "/:id",
    [   
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeFacturaId),
        validarCampos
    ], facturaDelete);

module.exports = router;