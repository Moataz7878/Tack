import { Router } from "express";
import { GetallUser, addSchool, addgrade, addsubjects, governorates, grades, logOut, login, school, signUp, subjects } from "./user.controll.js";
import { validation } from "../validation/validation.js";
import { loginValidation, signUpValidatinon } from "./user.validation.js";
import { UsersOfTeacher, followTeacher, getSubject, getallInvitations, getallTeacherOfTheGrades, homePage, profileUser, schoolsToStudent, theInvitation, theSchool, thedegreeExam, thedegreeUsers } from "./Student.controll.js";
import { fileUploud, validation_Array } from "../utils/multer.js";


const routerUser = Router()


routerUser.post('/signUP',fileUploud(validation_Array.image).single('img'),
// validation(signUpValidatinon),
signUp)
routerUser.post('/login' ,login)
routerUser.post('/logOut',logOut)
routerUser.post('/followTeacher',followTeacher)



routerUser.get('/getallGovernorates',governorates)
routerUser.post('/getallschool',school)
routerUser.post('/addSchool',addSchool)
routerUser.get('/getallgrades',grades)
routerUser.post('/addgrade',addgrade)
routerUser.get('/subjects',subjects)
routerUser.post('/addsubjects',addsubjects)



routerUser.post('/getallhomePage',homePage)
routerUser.post('/getSubject',getSubject)


routerUser.post('/thedegreeExam',thedegreeExam)


routerUser.post('/theInvitation',theInvitation)


routerUser.post('/getallInvitations',getallInvitations)



routerUser.post('/theSchool',theSchool)
routerUser.post('/getallUser',GetallUser)



routerUser.get('/schoolsToStudent',schoolsToStudent)


routerUser.post('/thedegreeUsers',thedegreeUsers)


routerUser.post('/profileUser',profileUser)



routerUser.post('/getallTeacherOfTheGrades',getallTeacherOfTheGrades)
routerUser.post('/UsersOfTeacher',UsersOfTeacher)















export {routerUser}