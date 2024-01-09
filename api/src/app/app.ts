import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import appRouter from '../routes/index.js'

dotenv.config()

//connection to port 
const app = express()

//middlewares 
app.use(express.json())

//only for dev 
app.use(morgan('dev'))



app.use('/api/v1', appRouter)


export default app
