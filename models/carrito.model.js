const mongoose = require('mongoose');

const CarritoSchema = mongoose.Schema({

    productos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    cantidad: {
        type: [Number],
        default: 1
    },

    estado: {
        type: Boolean,
        default: true
    }

});


module.exports = mongoose.model('Carrito', CarritoSchema);