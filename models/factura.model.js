const { Schema, model} = require('mongoose');

const FacturaSchema = Schema({

    numeroFactura: {
        type: String,
        required: [true, 'El número es automático']
    },

    fechaEmision: {
        type: Date,
        default: Date.now,
        required: [true, "Fecha automática"]
    },

    cliente: {
        type: String,
        required: [true, 'Cliente que está comprando']
    },

    producto: {
        type: String,
        required: [true, 'Productos en el carrito']
    },

    detalle: {
        type: String,
        required: [true, 'Detalles de la factura']
    },

    estado: {
        type: Boolean,
        default: true
    }

});


module.exports = model('Factura', FacturaSchema);