import { Router } from "express";
import { addcomment, commentlike, deletecomment, getallComment } from "./commint.controll.js";
// import { addPosts, deletePost } from "./post.controll.js";


const routercom= Router()


routercom.post('/addcommint',addcomment)
routercom.post('/addLikeComment',commentlike)
routercom.post('/getallComment',getallComment)
routercom.delete('/deletecomment',deletecomment)
// routerpost.delete('/deletePost',deletePost)






export {routercom}