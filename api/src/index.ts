import path from "path";
import { connectToDB, disconnectDB } from './db/connection.js'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

//connection to port 
const app = express()

//db connection 
connectToDB()
    .then(() => {
        app.listen(7000, () => console.log('Server is running on port' + 7000))
    })
    .catch((e) => console.log(e))

    
  const __dirname = path.resolve()



//middlewares 
app.use(cors({origin: ["http://127.0.0.1:5173", 'https://my-gpt-0abo.onrender.com/'] ,credentials: true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//only for dev 
app.use(morgan('dev'))

app.use('/api/v1', appRouter)

app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'));
})


export default app


