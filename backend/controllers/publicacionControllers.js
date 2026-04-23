const asyncHandler = require('express-async-handler');
const Publicacion = require('../models/publicacionModel');

// Obtener publicación
const getPublicaciones = asyncHandler(async (req, res) => {
    const publicaciones = await Publicacion.find().sort({ createdAt: -1 });
    res.status(200).json(publicaciones);
});

// Crear publicación
const addPublicacion = asyncHandler(async (req, res) => {
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

// Actualizar publicación
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
// Eliminar una publicación
const deletePublicacion = asyncHandler(async (req, res) => {
    const publicacion = await Publicacion.findById(req.params.id);
    if (!publicacion) {
        res.status(404);
        throw new Error('Publicación no encontrada');
    }
    // Borrar las imágenes de Cloudinary
    if (publicacion.multimedia && publicacion.multimedia.length > 0) {
        for (const url of publicacion.multimedia) {
            // Extrae el public_id de la URL de Cloudinary
            const nombreArchivo = url.split('/').pop().split('.')[0]; 
            const publicId = `publicaciones_app/${nombreArchivo}`;
            
            await cloudinary.uploader.destroy(publicId);
        }
    }
    // Borrar de MongoDB
    await publicacion.deleteOne();
    res.status(200).json({ message: 'Eliminado', id: req.params.id });
});

module.exports = {
    getPublicaciones,
    addPublicacion,
    updatePublicacion,
    deletePublicacion
};