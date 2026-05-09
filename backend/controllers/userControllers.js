const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

const addUsers = asyncHandler(async (req, res) => {
    if(!req.body.nombre){
        res.status(400)
        throw new Error("Teclea el nombre del usuario")
    }
    if(!req.body.email){
        res.status(400)
        throw new Error("Teclea el email")
    }
    if(!req.body.contrasena){
        res.status(400)
        throw new Error("Teclea la contraseña")
    }
    if(!req.body.contrasena){
        res.status(400)
        throw new Error("Teclea la contraseña")
    }


    const user = await User.create({
        nombre: req.body.nombre,
        email: req.body.email,
        contrasena: req.body.contrasena
    })

    if (user){
        res.status(201).json(user)
    } else{
        res.status(500)
        throw new Error("Hubo un error")
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error("Usuario no encontrado")
    }

    const userUpdated = await User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true } 
    )

    res.status(200).json(userUpdated)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(404)
        throw new Error("Usuario no encontrado")
    } else {
        await User.deleteOne(user)
        res.status(200).json({"Mensaje":"Usuario Eliminado"})
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body // O 'contrasena' según tu modelo

    // 1. Buscar al usuario por email
    const user = await Usuario.findOne({ email })

    // 2. Comparar la contraseña ingresada con la encriptada en la DB
    // Nota: Si en tu modelo usas 'contrasena', cámbialo aquí
    if (user && (await bcrypt.compare(password, user.contrasena))) {
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id) // Generamos el token de acceso
        })
    } else {
        res.status(401)
        throw new Error('Credenciales inválidas')
    }
})

// Función para generar el JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d' // El token expira en 30 días
    })
}

module.exports = {
    // ... tus otras funciones (register, etc)
    loginUser
}

module.exports = {
    getUsers, addUsers, deleteUser, updateUser, loginUser
}