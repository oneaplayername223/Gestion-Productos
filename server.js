import express from 'express';
import cors from 'cors';
import loginRoutes from './routes/loginRoutes.js';
import userRoutes from './routes/userRoutes.js';
import guessRoutes from './routes/guessRoutes.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
//server config

const app = express()
const port = 5000

//middlewares

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser())
app.use('/imagen', express.static('./imagen'));



//routes


app.use(loginRoutes)
app.use(userRoutes)
app.use(guessRoutes)


app.listen(port)
console.log('servidor en puerto:',port)