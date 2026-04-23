const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

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
        { new: true, runValidators: true } // new: true devuelve el usuario ya cambiado
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

module.exports = {
    getUsers, addUsers, deleteUser, updateUser
}