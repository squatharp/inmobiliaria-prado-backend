const express = require('express')
const router = express.Router()

const{ getUsers, addUsers, deleteUser, updateUser} = require('../controllers/userControllers')

//obtener movimientos
router.get('/', getUsers)

//agregar movimientos
router.post('/', addUsers)

//borrar movimientos
router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

module.exports = router