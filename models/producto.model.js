const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nameProduct:{
        type: String,
        required: [true, 'El nombre del producto no puede estar vacio..']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion es necesaria.']
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    precio: {
        type: Number,
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

module.exports = mongoose.model('Producto', ProductoSchema);