const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { 
    getPublicaciones, 
    setPublicacion, 
    updatePublicacion, 
    deletePublicacion 
} = require('../controllers/publicacionControllers');

// Rutas para /api/publicaciones
router.get('/', getPublicaciones);
router.post('/', upload.array('multimedia', 50), setPublicacion);

// Rutas para /api/publicaciones/:id
router.put('/:id', upload.array('multimedia', 50), updatePublicacion);
router.delete('/:id', deletePublicacion);

module.exports = router;