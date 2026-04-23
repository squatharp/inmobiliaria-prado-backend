const mongoose = require("mongoose")

const publicacionSchema = mongoose.Schema({
    tipoDePropiedad: {
        type: String,
        required: [true, "Por favor elige el tipo de propiedad"],
        enum: {
            values: ["Casa","Casa en Condominio","Departamento","Terreno", "Bodega","Local","Oficina","Otro"]
        }, 
    },
    otroTipoDePropiedad: {
        type: String,
        required: function() {
            // Este campo es obligatorio solo si tipoDePropiedad es 'Otro'
            return this.tipoDePropiedad === 'Otro';
        },
        trim: true
    },
    multimedia: {
        type: [String], //URLs de Cloudinary
        validate: {
            validator: function(v) {
                return v.length <= 50;
            },
            message: 'No puedes subir más de 50 archivos'
        }
    },
    titulo:{
        type: String,
        required: [true, "Por favor introduce un título "],
        trim: true,
        maxlength:[150, "El título no puede exceder los 150 carácteres"]
    },
    descripcion:{
        type: String,
        required: [true, "Por favor introduce una descripción "],
        trim: true,
        maxlength:[10000, "La descripción no puede exceder los 10,000 carácteres"]
    },
    tipoDeOperacion: {
        type: String,
        required: [true, "Por favor elige el tipo de operación"],
        enum: {
            values: ["Venta", "Renta"]
        }, 
    },
    precio: {
        type: Number,
        required: [true, "Por favor introduce un precio en MXN "]
    },
    recamaras: {
        type: Number,
        min: [0, "No puedes tener un número negativo de recámaras"],
        default: 0
    },
    baños: {
        type: Number,
        min: [0, "No puedes tener un número negativo de baños"],
        default: 0
    },
    mediosBaños: {
        type: Number,
        min: [0, "No puedes tener un número negativo de medios baños"],
        default: 0
    },
    construccion: {
        type: Number,
        min: [0, "No puedes tener un número negativo de m2 de construcción"],
        default: 0
    },
    terreno: {
        type: Number,
        min: [0, "No puedes tener un número negativo de m2 de terreno"],
        default: 0
    },
    estado:{
        type: String,
        required: [true,"Por favor introduce el estado en donde se encuentra la propiedad"],
        trim: true,
        maxlength:[100, "El estado no puede exceder los 100 carácteres"]
    },
    ciudad:{
        type: String,
        required: [true,"Por favor introduce la ciudad en donde se encuentra la propiedad"],
        trim: true,
        maxlength:[100, "La ciudad no puede exceder los 100 carácteres"]
    },
    colonia:{
        type: String,
        required: [true,"Por favor introduce la colonia en donde se encuentra la propiedad"],
        trim: true,
        maxlength:[100, "La colonia no puede exceder los 100 carácteres"]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Publicacion', publicacionSchema)