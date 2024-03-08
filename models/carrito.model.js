const mongoose = require('mongoose');

const CarritoSchema = mongoose.Schema({
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }],
    cantidad: {
        type: [String], // Cambia el tipo a un array de números
        default: ["1"] // Establece un array con un valor predeterminado de 1
    },
    estado: {
        type: Boolean,
        default: true
    }

});



module.exports = mongoose.model('Carrito', CarritoSchema);
