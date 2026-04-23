const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { 
    getPublicaciones, 
    addPublicacion, 
    updatePublicacion, 
    deletePublicacion 
} = require('../controllers/publicacionControllers');

router.get('/', getPublicaciones);
router.post('/', upload.array('multimedia', 50), addPublicacion);

router.put('/:id', upload.array('multimedia', 50), updatePublicacion);
router.delete('/:id', deletePublicacion);

module.exports = router;