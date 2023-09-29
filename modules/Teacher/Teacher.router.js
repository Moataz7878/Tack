import { Router } from "express";
import { TeacherOrders, TeacherOrdersMessage, addAdvice, addFolower, addQuestion, addQuestionVideo, addconfirm, addconfirmTeacher, addexam, addexamVideo, addgrades, cashVideoUser, cash_Withdrawal, confirmOrder, confirmcashVideo, createGradeVideo, createvideo, degreeExamVideo, deleteExam, deleteExamVideo, deleteGradeVideo, deleteQuestion, deleteQuestionVideo, deleteVideo, gatallCashVideo, gatallVideoTeachertoUser, getallAdvices, getallGradeVideo, getallIdUser, getallOrder, getallReceivablesPage, getallTeacherAddFolowers, getallTeacherPage, getallTeacherofStudent, getallTeacherofgrades, getallVideoTeacher, getallconfirmTeacher, getallexam, getallexamQuestionVideo, getallexamsofgrades, getallteavhersGradesVideoUser, getalltreacherGradesVideo, updateExam, updateExamVideo, updateGradeVideo, updateQuestion, updateQuestionVideo, updateVideo } from "./Teacher.controll.js";
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


//////////////////////////Update////////////////////////////////////////
routerpoll.post('/createGradeVideo',createGradeVideo)
routerpoll.delete('/deleteGradeVideo',deleteGradeVideo)
routerpoll.put('/updateGradeVideo',updateGradeVideo)
routerpoll.post('/getallGradeVideo',getallGradeVideo)



///
routerpoll.post('/createvideo',fileUploud(validation_Array.video).single('img'),createvideo)
routerpoll.delete('/deleteVideo',deleteVideo)
routerpoll.put('/updateVideo',updateVideo)
routerpoll.post('/getallVideoTeacher',getallVideoTeacher)
routerpoll.post('/getalltreacherGradesVideo',getalltreacherGradesVideo)
///

routerpoll.post('/addexamVideo',addexamVideo)
routerpoll.delete('/deleteExamVideo',deleteExamVideo)
routerpoll.put('/updateExamVideo',updateExamVideo)
routerpoll.post('/getallexamQuestionVideo',getallexamQuestionVideo)

////

routerpoll.post('/addQuestionVideo',fileUploud(validation_Array.image).single('img'),addQuestionVideo)
routerpoll.delete('/deleteQuestionVideo',deleteQuestionVideo)
routerpoll.put('/updateQuestionVideo',fileUploud(validation_Array.image).single('img'),updateQuestionVideo)

//////
routerpoll.post('/gatallVideoTeachertoUser',gatallVideoTeachertoUser)
routerpoll.post('/cashVideoUser',fileUploud(validation_Array.image).single('img'),cashVideoUser)

routerpoll.get('/gatallCashVideo',gatallCashVideo)

routerpoll.put('/confirmcashVideo',confirmcashVideo)

routerpoll.post('/getallteavhersGradesVideoUser',getallteavhersGradesVideoUser)

routerpoll.post('/getallIdUser',getallIdUser)

//////
routerpoll.post('/degreeExamVideo',degreeExamVideo)












export {routerpoll}



