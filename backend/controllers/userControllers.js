const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

const addUsers = asyncHandler(async (req, res) => {
    const { nombre, email, contrasena } = req.body

    if (!nombre || !email || !contrasena) {
        res.status(400)
        throw new Error("Por favor teclea todos los campos")
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(contrasena, salt)

    const user = await User.create({
        nombre,
        email,
        contrasena: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Datos de usuario inválidos")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, contrasena } = req.body 

    // CORRECCIÓN: Usar 'User' que es como lo importaste arriba
    const user = await User.findOne({ email })

    // Comparamos password (del body) con user.contrasena (de la DB)
    if (user && (await bcrypt.compare(contrasena, user.contrasena))) {
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Credenciales inválidas')
    }
})

const updateUser = asyncHandler(async (req, res) => {
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
    }
    await User.deleteOne({ _id: req.params.id })
    res.status(200).json({ id: req.params.id, mensaje: "Usuario Eliminado" })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// CORRECCIÓN: Solo un module.exports al final
module.exports = {
    getUsers, 
    addUsers, 
    deleteUser, 
    updateUser, 
    loginUser
}