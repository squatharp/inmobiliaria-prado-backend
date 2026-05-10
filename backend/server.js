const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const port = process.env.PORT || 5000
const {errorHandler} = require ('./middleware/errorMiddleware')
const cors = require("cors")

connectDB()

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://tu-frontend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json())
app.use('/api/publicaciones', require('./routes/publicacionRoutes'))
app.use('/api/usuarios', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))