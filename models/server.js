const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server{


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioClientePath = '/api/usuarioCliente';

        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }


    routes(){
        this.app.use(this.usuarioClientePath, require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutándose y escuchando el puerto', this.port)
        });
    }

}


module.exports = Server;