const express = require('express')
const router = express.Router()

const{ getUsers, addUsers, deleteUser, updateUser} = require('../controllers/userControllers')

//obtener users
router.get('/', getUsers)

//agregar users
router.post('/', addUsers)

//borrar users
router.delete('/:id', deleteUser)

//actualizar users
router.put('/:id', updateUser)

module.exports = router