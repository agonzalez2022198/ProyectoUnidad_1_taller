const Factura = require('../models/factura.model');
const { response } = require('express');
const Carrito = require("../models/carrito.model");
const Producto = require("../models/producto.model");

const facturasGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    cibst[toDefaultValur, factura] = await Promise.all([
        Factura.countDocuments(query),
        Factura.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        factura
    });

}


const getFacturasById = async (req, res) => {
    const { id } = req.params;
    const factura = await Factura.findOne({ _id: id });

    res.status(200).json({
        factura
    });
}

const putFactura = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    try {

        await Factura.findByIdAndUpdate(id, resto);


        const facturaAct = await Factura.findById(id);

        res.status(200).json({
            factura: facturaAct,
            msg: 'La factura se ha actualizado'
        });
    } catch (error) {
        console.error('Error al actualizar la factura:', error);
        res.status(500).json({ error: 'Error del servidor al actualizar la factura' });
    }
}


const facturaDelete = async (req, res) => {

    const { id } = req.params;
    const factura = await Factura.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        factura,
        msg: "Categoria a eliminar"
    });
}


const facturaPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { numeroFactura, cliente, detalle, totalPay } = req.body;

        const carrito = await Carrito.findById(id);

        if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado, men' });
        }

        const cantidadesProductos = carrito.productos.map(item => item.cantidad);

        // Extraer solo los IDs de los productos del carrito
        const productosIds = carrito.productos.map(item => {
            if (item.producto) {
                return item.producto.toString();
            } else {
                return null; // Otra opción podría ser devolver una cadena vacía ''
            }
        });

        console.log("IDs de los productos del carrito:", productosIds);

        // Continúa con tu lógica aquí...

        const productsCarrito = await Promise.all(productosIds.map(async (productId) => {
            try {
                const producto = await Producto.findById(productId);
                return producto;
            } catch (error) {
                console.error(`Error al encontrar el producto con ID ${productId}:`, error);
                return null; // Otra opción podría ser devolver un objeto con un mensaje de error
            }
        }));

        const nombresProductos = productsCarrito.filter(producto => producto !== null).map(producto => producto.nameProduct);
        const total = nombresProductos.join(', ').toString();

        const precios = productsCarrito.filter(producto => producto !== null).map(producto => producto.precio);
        const totalP = nombresProductos.join(', ').toString();

        console.log("Nombres de los productos del carrito:", nombresProductos);

        console.log("Catidades:", cantidadesProductos);
        console.log("Precios:", precios);

        //const totales = cantidadesProductos * precios;

        const totalCompra = productsCarrito.reduce((total, producto, index) => {
            if (producto) {
                return total + (producto.precio * cantidadesProductos[index]);
            } else {
                return total;
            }
        }, 0);

        console.log("Total de la compra:", totalCompra);

        const factura = new Factura({ 
            numeroFactura, 
            cliente, 
            detalle, 
            producto: nombresProductos.join(', '), // Concatenar los nombres de los productos
            totalPay: totalCompra 
        });

        await factura.save();

        res.status(202).json({
            msg: "Compra realizada",
            factura
        });

    } catch (error) {
        console.error('Error al crear la factura:', error);
        res.status(500).json({ error: 'Error al crear la factura' });
    }
}






module.exports = {
    facturasGet,
    getFacturasById,
    putFactura,
    facturaDelete,
    facturaPost
}