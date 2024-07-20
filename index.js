import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import eventsRoutes from './routes/events.js'
import dbConnection from './db/config.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors()) // Habilitar CORS
app.use(express.json()) // Lectura y parseo del body
app.use(express.static('public')) // Carpeta publica

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventsRoutes)

// Iniciar servidor
dbConnection()


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})