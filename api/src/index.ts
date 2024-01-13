import path from "path";
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

//connection to port 
// const app = express()

//db connection 



mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve()



//middlewares 



const app = express()

app.use(cors({
  origin: ['https://my-gpt-0abo.onrender.com', "http://127.0.0.1:5173"], // Adjust this to your frontend origin
  credentials: true,
  preflightContinue: true
}));


app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

app.listen(3000, () => console.log('Server is running on port 3000'))

//only for dev 
app.use(morgan('dev'))

app.use('/api/v1', appRouter)

app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'));
})


export default app


