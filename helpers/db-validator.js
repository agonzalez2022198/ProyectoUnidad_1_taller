const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto.model');
const Categoria = require('../models/categorias.model');
const Factura = require('../models/factura.model');

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

const existeCategoriaById = async ( id = '') => {
    const existenteCategoria = await Categoria.findOne({id});
    
    if(existenteCategoria){
        throw new Error(`La categoria con id ${ id } no existe maje`);
    }
}

const existeFacturaId = async ( id = '') => {
    const existFact = await Categoria.findOne({id});
    
    if(existFact){
        throw new Error(`La factura con id ${ id } no existe maje`);
    }
}

module.exports = {
    esRoleValido,
    existenteEmail,
    existeUsuarioById,
    existeProductById,
    existeCategoriaById,
    existeFacturaId
}