import { Router } from "express";
import { addPosts, deletePost, getllAllPost } from "./post.controll.js";


const routerpost = Router()


routerpost.post('/addPost',addPosts)
routerpost.delete('/deletePost',deletePost)
routerpost.post("/getallpost",getllAllPost)





export {routerpost}