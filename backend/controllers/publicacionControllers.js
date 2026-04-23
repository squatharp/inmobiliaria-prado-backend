const asyncHandler = require('express-async-handler');
const Publicacion = require('../models/publicacionModel');

// @desc    Obtener todas las publicaciones
const getPublicaciones = asyncHandler(async (req, res) => {
    const publicaciones = await Publicacion.find().sort({ createdAt: -1 });
    res.status(200).json(publicaciones);
});

// @desc    Crear una publicación
const setPublicacion = asyncHandler(async (req, res) => {
    let urls = [];
    if (req.files) {
        urls = req.files.map(file => file.path);
    }
    const nuevaPublicacion = await Publicacion.create({
        ...req.body,
        multimedia: urls
    });
    res.status(201).json(nuevaPublicacion);
});

// @desc    Actualizar una publicación
const updatePublicacion = asyncHandler(async (req, res) => {
    let datosAActualizar = { ...req.body };
    
    if (req.files && req.files.length > 0) {
        datosAActualizar.multimedia = req.files.map(file => file.path);
    }

    const actualizada = await Publicacion.findByIdAndUpdate(
        req.params.id,
        datosAActualizar,
        { new: true, runValidators: true }
    );

    if (!actualizada) {
        res.status(404);
        throw new Error('Publicación no encontrada');
    }
    res.status(200).json(actualizada);
});

const cloudinary = require('cloudinary').v2;
// @desc    Eliminar una publicación
const deletePublicacion = asyncHandler(async (req, res) => {
    const publicacion = await Publicacion.findById(req.params.id);
    if (!publicacion) {
        res.status(404);
        throw new Error('Publicación no encontrada');
    }
    // 1. Borrar las imágenes de Cloudinary
    if (publicacion.multimedia && publicacion.multimedia.length > 0) {
        for (const url of publicacion.multimedia) {
            // Este truco extrae el public_id de la URL de Cloudinary
            const nombreArchivo = url.split('/').pop().split('.')[0]; 
            const publicId = `publicaciones_app/${nombreArchivo}`; // 'publicaciones_app' es el folder que definimos antes
            
            await cloudinary.uploader.destroy(publicId);
        }
    }
    // 2. Borrar de MongoDB
    await publicacion.deleteOne();
    res.status(200).json({ message: 'Eliminado', id: req.params.id });
});

module.exports = {
    getPublicaciones,
    setPublicacion,
    updatePublicacion,
    deletePublicacion
};