const Categoria = require('../models/categorias.model');
const { response } = require('express');

const categoriasGet = async (req, res = response) => {
    const {limite, desde} = rep.query;
    const query = {estado: true}

    cibst [toDefaultValue, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categoria
    });

}



const getCategoriasById = async (req, res) => {
    const {id} = req.params;
    const categoria = await Categoria.findOne({_id: id});

    res.status(200).json({
        categoria
    });
}

// No me funcionaba, hasta que busqué métodos para arreglarlo.
const putCategorias = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    try {
        
        await Categoria.findByIdAndUpdate(id, resto);

        
        const categoriaActualizada = await Categoria.findById(id);

        res.status(200).json({
            categoria: categoriaActualizada,
            msg: 'La categoría se ha actualizado'
        });
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ error: 'Error del servidor al actualizar la categoría' });
    }
}


const categoriaDelete = async (req, res) => {

    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        categoria,
        msg: "Categoria a eliminar"
    });
}


const categoriaPost = async (req, res) => {
    const {nombreCat, descripcionCat} = req.body;
    const categoria = new Categoria({nombreCat, descripcionCat});

    await categoria.save();
    res.status(202).json({
        categoria
    });
}


module.exports = {
    categoriasGet,
    getCategoriasById,
    putCategorias,
    categoriaDelete,
    categoriaPost
}