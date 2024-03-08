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

        const productos = await Promise.all(carrito.productos.map(async (item) => {
            const producto = await Producto.findById(item.producto);
            return {
                producto,
                cantidad: item.cantidad
            };
        }));



        /*const detallesProductos = productos.map(producto => {
            return {
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad
            };
        });*/

        res.status(202).json({
            productos
        });


        const factura = new Factura({ numeroFactura, cliente, productos, detalle, totalPay });
        await factura.save();

        res.status(202).json({  
            msg: "Compra realizada",
            factura
        });
    } catch (error) {
        console.error('Error al crear la factura:', error);
        res.status(404).json({ error: 'Error al crear la factura' });
    }
}



module.exports = {
    facturasGet,
    getFacturasById,
    putFactura,
    facturaDelete,
    facturaPost
}