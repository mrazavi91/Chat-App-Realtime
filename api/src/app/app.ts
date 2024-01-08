import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

//connection to port 
const app = express()

//middlewares 
app.use(express.json())


export default app
