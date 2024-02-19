const { Router } = require('express');
const { check } = require('express-validator');


const {validarCampos, esAdminRole, tieneRolAutorizado} = require('../middlewares');

const {
    usuariosPost,
    usuariosGet,
    getUsuariosById,
    putUsuarios, usuariosDelete
} = require('../controllers/user.controller');

const { existenteEmail, esRoleValido, existeUsuarioById } = require('../helpers/db-validator');

const router = Router();

router.get("/", usuariosGet);


router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getUsuariosById),
        validarCampos
    ], getUsuariosById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getUsuariosById),
        check("role").custom(esRoleValido),
        validarCampos
    ], putUsuarios);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], usuariosPost);

router.delete(
    "/:id",
    [   
        //validarJWT,
        //esAdminRole,
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete);

module.exports = router;