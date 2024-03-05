const Producto = require('../models/producto.model');
const { response } = require('express');
const Carrito = require('../models/carrito.model');



const carritoGet = async (req, res = response) => {
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



const putCarrito = async (req, res = response) =>{
    const { id } = req.params;
    const {_d, ...resto } = req.body;


    await Producto.findByIdAndUpdate(id, resto);

    const producto = Producto.findOne({id});

    res.status(200).json({
        msg: 'Producto Actualizado Exitosamente, parce',
        producto
    });
}

const carritoDelete = async (req, res) => {
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false});
    //const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: 'Se elimino el producto',
        producto
    });
}



const postCarrito = async (req, res) => {
    const { producto, cantidad } = req.body;

    try {
        
        let product = await Producto.findOne({ nemeProduct: producto });

        // Si la categoría no existe, crearla
        if (!product) {
            product = new Producto({ nameProduct: producto });
            await categoria.save();
        }

        // Crear el producto y asignarle la categoría
        const carrito = new Carrito({
            producto: producto._id, cantidad
        });

        await carrito.save();

        res.status(200).json({
            msg: 'Producto agregado exitosamente',
            car: {
                ...carrito.toObject(),
                producto: producto.nameProduct
            }
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};



module.exports = {
    carritoGet,
    putCarrito,
    carritoDelete,
    postCarrito
}