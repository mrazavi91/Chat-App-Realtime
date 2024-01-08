import mongoose from "mongoose"

export const connectToDB = async () => {
    
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to DB!')
    } catch (error) {
        throw new Error('Cannot connect to DB!')
    }
}


export const disconnectDB = async () => {
    
    try {
        await mongoose.disconnect()
    } catch (error) {
        throw new Error('Cannot connect to DB!')
    }
} 