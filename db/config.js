const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Base de datos conectada, perro!!');
    } catch (e) {
        throw Error('Error al conectarse a la bse de datos.', e);
    }
}


module.exports = {
    dbConnection
}