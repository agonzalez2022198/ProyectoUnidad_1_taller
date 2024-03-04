const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'Tu nombre es obligatorio']
    },

    
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria']
    },

    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        defaullt: "CLIENT"
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

})