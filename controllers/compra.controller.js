const Compra = require('../models/compra.model');

const { response } = require('express');
const Categoria = require('../models/categorias.model');


//Administrador

const getCompras = async (req, res) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};


    const [total, compra] = await Promise.all([
        Compra.countDocuments(query),
        Compra.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res. status(200).json({
        total,
        compra
    });
}


const postCompra = async (req, res) =>{
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
}