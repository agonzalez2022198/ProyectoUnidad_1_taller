//const bcrypt = require('bcrypt');
const Producto = require('../models/producto.model');
const { response } = require('express');
const Categoria = require('../models/categorias.model');

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


const postProductos = async (req, res) => {
    const { nombreCategoria, nameProduct, descripcion, precio, stock } = req.body;

    try {
        // Buscar la categoría por nombre
        let categoria = await Categoria.findOne({ nombreCat: nombreCategoria });

        // Si la categoría no existe, crearla
        if (!categoria) {
            categoria = new Categoria({ nombreCat: nombreCategoria });
            await categoria.save();
        }

        // Crear el producto y asignarle la categoría
        const producto = new Producto({
            nameProduct, descripcion, precio, stock,
            categoria: categoria._id,
        });

        await producto.save();

        res.status(200).json({
            msg: 'Producto agregado exitosamente',
            product: {
                ...producto.toObject(),
                categoria: categoria.nombreCat
            }
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};



module.exports = {
    productosGet,
    getProductosById,
    putProductos,
    productosDelete,
    productosPost,
    postProductos
}