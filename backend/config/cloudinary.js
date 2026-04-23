const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Conexión con Cloudinary usando tus variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// 2. Configuración del almacenamiento
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'publicaciones_app', // Nombre de la carpeta que se creará en tu Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webm', 'mp4'], // Formatos permitidos
        // Aquí puedes agregar transformaciones automáticas si quieres (ej: resize)
    },
});

// 3. El middleware que usaremos en las rutas
const upload = multer({ storage: storage });

module.exports = upload;