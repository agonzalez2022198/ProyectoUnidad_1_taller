const bcryptjs = require('bcryptjs');
const Cliente = require('../models/cliente.model');
const { response } = require('express');


const clientesGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};


    const [total, clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res. status(200).json({
        total,
        clientes
    });
}

const getClientesById = async (req, res = response) => {
    const {id} = req.params;
    const cliente = await Cliente.findOne({_id: id});

    res.status(200).json({
        cliente
    });
}


//Pendiente

/*const putCliente = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, password, google, correo, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await Usuario.findByIdAndUpdate(id, resto);

    const usuario = Usuario.findOne({id});

    res.status(200).json({
        msg: 'Usuario Actualizado Exitosamente!!!',
        usuario
    });
}*/

const clienteDelete = async (req, res) => {
    const {id} = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, {estado: false});
    const clienteAut = req.cliente;

    res.status(200).json({
        msg: 'cliente a eliminar :)',
        cliente,
        clienteAut
    });
}

const clientePost = async (req, res) => {
    const{nombre, correo, password} = req.body;
    const cliente = new Cliente({nombre, correo, password});


    const salt = bcryptjs.genSaltSync();
    cliente.password = bcryptjs.hashSync(password, salt);

    await cliente.save();
    res.status(202).json({
        cliente
    });
}