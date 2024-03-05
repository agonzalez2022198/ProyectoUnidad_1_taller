const mongoose = require('mongoose');

const CompraSchema = mongoose.Schema({

    productos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },

    total: {
        type: Number,
        required: [true, "Es automático"]
    },

    nit: {
        type: String,
        required: [true, "Ingresa tu nit"]
    },

    /*pago: {
        type: String,

    }*/

    idCompra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },

    estado: {
        type: Boolean,
        default: true
    }

});


module.exports = mongoose.model("Compra", CompraSchema);