const Producto = require('../models/producto.model');
const { response } = require('express');
const Carrito = require('../models/carrito.model');
//const Session = require('express-session');




const carritoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };


    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.status(200).json({
        total,
        producto
    });
}



const putCarrito = async (req, res = response) => {
    const { id } = req.params;
    const { _d, ...resto } = req.body;


    await Producto.findByIdAndUpdate(id, resto);

    const producto = Producto.findOne({ id });

    res.status(200).json({
        msg: 'Producto Actualizado Exitosamente, parce',
        producto
    });
}

const carritoDelete = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false });
    //const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: 'Se elimino el producto',
        producto
    });
}



const postCarrito = async (req, res) => {
    const { productos, cantidad } = req.body;

    try {
        // Buscar el producto en la base de datos
        let product = await Producto.findOne({ nameProduct: productos });

        // Si el producto no existe, enviar un mensaje de error
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Crear el carrito y asignarle el producto encontrado
        const carrito = new Carrito({
            productos: product._id, cantidad
        });

        // Guardar el carrito en la base de datos
        await carrito.save();

        // Enviar respuesta exitosa
        res.status(200).json({
            msg: 'Producto agregado exitosamente',
            carrito
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};


const addToCart = async (req, res) => {
    try {
        const { productoName } = req.body;

        //const cantidad = cantidad || 1;

        const producto = await Producto.findOne({ nameProduct: productoName });

        if (!producto) {
            console.log("El producto con ese nombre no existe");
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const carrito = new Carrito({ productos: producto._id });

        await carrito.save();

        res.status(200).json({
            msg: 'Producto agregado exitosamente',
            carrito
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



const updateCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const { newProduct } = req.body;

        // Buscar el producto en la base de datos utilizando su _id
        const producto = await Producto.findOne({ nameProduct: newProduct });


        if (!producto) {
            return res.status(404).json({
                error: "El producto no existe"
            });
        }

        const nuevoObjectId = producto._id;
        console.log("Este es el objectid", nuevoObjectId);

        const carrito = await Carrito.findById(id);

        if (!carrito) {
            return res.status(404).json({
                error: "Ese carrito no existe"
            });
        } else {
            // Verificar si el producto ya está en el carrito
            console.log("productos:", carrito.productos);
            console.log("nuevoObjectId:", nuevoObjectId);

            let productoEnCarritoIndex = -1;

            for (let i = 0; i < carrito.productos.length; i++) {
                console.log("producto actual:", carrito.productos[i]);
                if (carrito.productos[i] && carrito.productos[i].producto && carrito.productos[i].producto.equals(nuevoObjectId)) {
                    productoEnCarritoIndex = i;
                }
                
                
            }


            if (productoEnCarritoIndex === -1) {
                // Si el producto no está en el carrito, agregarlo con cantidad 1
                carrito.productos.push({ producto: nuevoObjectId, cantidad: 1 });
            } else {
                // Si el producto ya está en el carrito, incrementar la cantidad en 1
                carrito.productos[productoEnCarritoIndex].cantidad += 1;
            }

            // Guardar los cambios en el carrito
            await carrito.save();

            return res.status(200).json({
                msg: "Producto actualizado en el carrito",
                carrito
            });
        }
    } catch (e) {
        console.error('Error al actualizar el carrito:', e);
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
}



module.exports = {
    carritoGet,
    putCarrito,
    carritoDelete,
    postCarrito,
    addToCart,
    updateCarrito
}