const Producto = require('../models/producto.model');
const { response } = require('express');
const Carrito = require('../models/carrito.model');
//const Session = require('express-session');




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
    const { productos, cantidad } = req.body;

    try {
        // Buscar el producto en la base de datos
        let product = await Producto.findOne({ nameProduct: productos });

        // Si el producto no existe, enviar un mensaje de error
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Crear el carrito y asignarle el producto encontrado
        const carrito = new Carrito({
            productos: product._id, cantidad
        });

        // Guardar el carrito en la base de datos
        await carrito.save();

        // Enviar respuesta exitosa
        res.status(200).json({
            msg: 'Producto agregado exitosamente',
            carrito
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};


const addToCart = async (req, res) => {
    try {
        const {productoName} = req.body;

        //const cantidad = cantidad || 1;

        const producto = await Producto.findOne({nameProduct: productoName});

        if(!producto){
            console.log("El producto con ese nombre no existe");
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const carrito = new Carrito({productos: producto._id});

        await carrito.save();

        res.status(200).json({
            msg: 'Producto agregado exitosamente',
            carrito
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const updateCarrito = async (req, res) => {

    try {
        const {id} = req.params;
        
    } catch (e) {
        
    }

}




module.exports = {
    carritoGet,
    putCarrito,
    carritoDelete,
    postCarrito,
    addToCart
}