const Factura = require('../models/factura.model');
const { response } = require('express');

const facturasGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    cibst [toDefaultValur, factura] = await Promise.all([
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
    const {id} = req.params;
    const factura = await Factura.findOne({_id: id});

    res.status(200).json({
        factura
    });
}

// No me funcionaba, hasta que busqué métodos para arreglarlo.
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

    const {id} = req.params;
    const factura = await Factura.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        factura,
        msg: "Categoria a eliminar"
    });
}


const facturaPost = async (req, res) => {

   
    const {numeroFactura, cliente, producto, detalle} = req.body;
    const factura = new Factura({numeroFactura, cliente, producto, detalle});

    await factura.save();
    res.status(202).json({
        factura
    });
}


module.exports = {
    facturasGet,
    getFacturasById,
    putFactura,
    facturaDelete,
    facturaPost
}