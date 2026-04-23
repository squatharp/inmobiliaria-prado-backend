const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor introduce un nombre para el usuario"]
    },
    email: {
        type: String,
        required: [true, "Por favor introduce un email para el usuario"]
    },
    contrasena: {
        type: String,
        required: [true, "Por favor introduce una contraseña "]
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Usuario', userSchema)