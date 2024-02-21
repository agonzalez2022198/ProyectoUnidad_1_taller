//const bcrypt = require('bcrypt');
const Producto = require('../models/producto.model');
const { response } = require('express');

const productosGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};


    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res. status(200).json({
        total,
        producto
    });
}

const getProductosById = async (req, res = response) => {
    const {id} = req.params;
    const producto = await Usuario.findOne({_id: id});

    res.status(200).json({
        producto
    });
}


const putProductos = async (req, res = response) =>{
    const { id } = req.params;
    const {_d, ...resto } = req.body;

    //if(password){
    //    const salt = bcryptjs.genSaltSync();
    //    resto.password = bcryptjs.hashSync(password, salt);
    //}

    await Producto.findByIdAndUpdate(id, resto);

    const producto = Producto.findOne({id});

    res.status(200).json({
        msg: 'Producto Actualizado Exitosamente, parce',
        producto
    });
}

const productosDelete = async (req, res) => {
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false});
    //const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: 'Se elimino el producto',
        producto
    });
}

const productosPost = async (req, res) => {
    const{nameProduct, descripcion, categoria, precio, stock} = req.body;
    const producto = new Producto({nameProduct, descripcion, categoria, precio, stock});


    //const salt = bcryptjs.genSaltSync();
    //producto.password = bcryptjs.hashSync(password, salt);

    await producto.save();
    res.status(202).json({
        producto
    });
}


module.exports = {
    productosGet,
    getProductosById,
    putProductos,
    productosDelete,
    productosPost
}