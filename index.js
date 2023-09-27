import express from 'express'
import { json } from "express";
import { config } from "dotenv";
import cors from 'cors'
import { connectionDB } from './DB/connection.js';
import { routerUser } from './modules/user/user.router.js';
import { routerpoll } from './modules/Teacher/Teacher.router.js';
import { routerpost } from './modules/post/post.router.js';
import { routercom } from './modules/commint/commint.router.js';
import { routerGuardian } from './modules/Guardian/guardian.router.js';

config({path:'./config/config.env'})
const app = express()
app.use(cors());
const port = process.env.PORT ||4500
const baseURL ='/Node.js/api/v6'
app.use(json());
connectionDB()

app.use(`${baseURL}/use` ,routerUser)
app.use(`${baseURL}/com` ,routerpoll)
app.use(`${baseURL}/post`,routerpost)
app.use(`${baseURL}/commint`,routercom)
app.use(`${baseURL}/guard`,routerGuardian)

app.get('/', (req, res) => res.send('Hello Worl!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))