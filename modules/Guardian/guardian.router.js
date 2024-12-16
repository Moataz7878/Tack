import { Router } from "express";
import { followStudent, getallUserToGuardian, parentOfUsers } from "./guardian.controll.js";


const routerGuardian = Router()


routerGuardian.post('/getallUserToGuardian',getallUserToGuardian)
routerGuardian.post('/followStudent',followStudent)
routerGuardian.post('/parentOfUsers',parentOfUsers)






export {routerGuardian}