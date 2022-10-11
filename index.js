import 'dotenv/config'
import './database/connect.js'
import express from "express";
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.route.js'

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use('/', authRouter)
app.use('/links', linkRouter)

const PORT = process.env.PORT || 5005
app.listen(PORT, () => console.log("🔥🔥 http://localhost:" + PORT));