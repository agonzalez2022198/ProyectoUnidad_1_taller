const mongoose = require('mongoose');

const CarritoSchema = mongoose.Schema({
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto' // Referencia al modelo Producto
            },
            cantidad: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true });



module.exports = mongoose.model('Carrito', CarritoSchema);
