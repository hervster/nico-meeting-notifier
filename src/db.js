import mongoose from "mongoose"
const CONNECTION_URL =
    'mongodb://localhost:27017/NicoMeeting/React'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export { connectDB }