import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import appRouter from '../routes/index.js'
import cookieParser from 'cookie-parser'

dotenv.config()

//connection to port 
const app = express()

//middlewares 
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//only for dev 
app.use(morgan('dev'))



app.use('/api/v1', appRouter)


export default app
