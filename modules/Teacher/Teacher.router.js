import { Router } from "express";
import { TeacherOrders, TeacherOrdersMessage, addAdvice, addFolower, addQuestion, addconfirm, addconfirmTeacher, addexam, addgrades, cash_Withdrawal, confirmOrder, deleteExam, deleteQuestion, getallAdvices, getallOrder, getallReceivablesPage, getallTeacherAddFolowers, getallTeacherPage, getallTeacherofStudent, getallTeacherofgrades, getallconfirmTeacher, getallexam, getallexamsofgrades, updateExam, updateQuestion } from "./Teacher.controll.js";
import { fileUploud, validation_Array } from "../utils/multer.js";


const routerpoll = Router()

routerpoll.post('/addgrades',addgrades)
routerpoll.post('/addexam',addexam)
routerpoll.post('/addQuestion',fileUploud(validation_Array.image).single('img'),addQuestion)


routerpoll.delete('/deleteExam',deleteExam)

routerpoll.delete('/deleteQuestion',deleteQuestion)
routerpoll.patch('/updateExam',updateExam)
routerpoll.patch('/updateQuestion',fileUploud(validation_Array.image).single('img'),updateQuestion)


routerpoll.post('/getallTeacherPage',getallTeacherPage)
routerpoll.post('/getallTeacherofStudent',getallTeacherofStudent)
routerpoll.post('/getallexam',getallexam)


routerpoll.post('/getallexamsofgrades',getallexamsofgrades)
routerpoll.post('/getallTeacherofgrades',getallTeacherofgrades)




routerpoll.post('/getallReceivablesPage',getallReceivablesPage)


routerpoll.post('/addFolower',addFolower)

routerpoll.get('/getallTeacherAddFolowers',getallTeacherAddFolowers)

routerpoll.post('/addconfirm',addconfirm)




routerpoll.post('/cash_Withdrawal',cash_Withdrawal)
routerpoll.get('/getallOrder',getallOrder)
routerpoll.post('/confirmOrder',fileUploud(validation_Array.image).single('img'),confirmOrder)

routerpoll.post('/TeacherOrders',TeacherOrders)
routerpoll.post('/TeacherOrdersMessage',TeacherOrdersMessage)


routerpoll.get('/getallconfirmTeacher',getallconfirmTeacher)
routerpoll.post('/addconfirmTeacher',addconfirmTeacher)


routerpoll.post('/addAdvice',addAdvice)
routerpoll.post('/getallAdvices',getallAdvices)









export {routerpoll}






