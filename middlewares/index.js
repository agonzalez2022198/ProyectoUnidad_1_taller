const validarCampos = require('../middlewares/validar-campos');
const esAdminRole = require('../middlewares/validar-roles');
const tieneRolAutorizado = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...esAdminRole,
    ...tieneRolAutorizado
}