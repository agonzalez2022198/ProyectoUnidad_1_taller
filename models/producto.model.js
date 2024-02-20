const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nameProduct:{
        type: String,
        required: [true, 'El nombre del producto no puede estar vacio..']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion es necesaria.']
    },
    categoria: {
        type: String,
        required: [true, 'es necesaria la categoria']
    },
    precio: {
        type: String,
        required: [true, 'Necesita un precio de ventas']
    },
    stock: {
        type: String,
        required: [true, 'La cantidad de productos que hay']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Producto', ProductoSchema);