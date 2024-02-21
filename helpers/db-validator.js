const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto.model')

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}


const existeProductById = async (id = '') => {
    const existenteProduct = await Producto.findOne({id});
    if(existenteProduct){
        throw new Error(`El producto de id ${ id } no existe ,compadre :(`);
    }
}

module.exports = {
    esRoleValido,
    existenteEmail,
    existeUsuarioById,
    existeProductById
}