import mongoose from 'mongoose'

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log('MongoDB connected')

    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
    }
}

export default dbConnection