const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware'); // 1. Importar el portero
const { 
    getPublicaciones, 
    addPublicacion, 
    updatePublicacion, 
    deletePublicacion 
} = require('../controllers/publicacionControllers');

// Ruta pública: Cualquiera puede ver las casas
router.get('/', getPublicaciones);

// Rutas protegidas: Solo administradores con token válido
// Nota: 'protect' debe ir ANTES de 'upload' para no procesar imágenes si no hay permiso
router.post('/', protect, upload.array('multimedia', 50), addPublicacion);

router.put('/:id', protect, upload.array('multimedia', 50), updatePublicacion);

router.delete('/:id', protect, deletePublicacion);

module.exports = router;