const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server{


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioClientePath = '/api/usuarioCliente';
        this.productoPath = '/api/productos';
        this.categoriaPath = '/api/categorias';
        this.facturaPath = '/api/facturas';
        this.carritoPath = '/api/carrito';

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
        this.app.use(this.usuarioClientePath, require('../routes/user.routes'));
        this.app.use(this.productoPath, require('../routes/producto.routes'));
        this.app.use(this.categoriaPath, require('../routes/categoria.routes'));
        this.app.use(this.facturaPath, require('../routes/facturas.routes'));
        this.app.use(this.carritoPath, require('../routes/carrito.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutándose y escuchando el puerto', this.port)
        });
    }

}


module.exports = Server;