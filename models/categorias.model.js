const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    nombreCat:{
        type: String,
        required: [true, 'Necesitas un nombre para la categoría']
    },

    descripcionCat:{
        type: String,
        required: [true, 'Es necesaria una descripcion']
    }



});

module.exports = model('Categoria', CategoriaSchema);