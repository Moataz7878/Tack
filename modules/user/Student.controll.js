// import lineFourModel from "../../DB/models/lineFour.model.js";
// import lineOneModel from "../../DB/models/lineOne.model.js";
// import lineTwoModel from "../../DB/models/lineTwo.model.js";
// import lineThreeModel from "../../DB/models/linethree.model.js";
import InvitationModel from "../../DB/models/Invitation.model.js";
import examModel from "../../DB/models/exam.model.js";
import degreenModel from "../../DB/models/examDegree.model.js";
import gradesModel from "../../DB/models/grades.model.js";
import questionModel from "../../DB/models/question.model.js";
import userModel from "../../DB/models/user.model.js";


 export const thedegreeExam =async(req,res,next)=>{
try {
    const {idUser ,degree,idexam} =req.body
    const user =await userModel.findOne({_id:idUser ,role:"Student"})
    if (!user) {
        return res.json({message:"fail idUser"})
    }
   
const exam =await examModel.findOne({_id:idexam})
if (!exam) {
  return res.json({message:"fail id exam"})
}
const userExest = await examModel.findOne({creatdUser : user._id ,_id:idexam })
if (userExest) {
 return res.json({message:"user orde Exest"})
}

// console.log(question.exam);
const theExam =   await examModel.findOneAndUpdate({_id:idexam},{
  $addToSet:{
    creatdUser:user._id
}
},{
  new:true
})
if (!theExam) {
  return res.json({message:"fail theExam "})
  
}
const newdegree =new degreenModel({
  degree:degree,
  UserId:idUser,
  idexam:idexam
})
if (!newdegree) {
  return res.json({message:"Fail degree"})
}

await newdegree.save()
res.json({message:"Done",theExam ,newdegree})

} catch (error) {
    console.log(error);
    res.json({message:"fail catch"})
}
}

export const homePage =async(req,res)=>{
  try {
    const {idUser ,subject}=req.body
    const user =await userModel.findOne({_id:idUser})
    if(!user){
      return res.json({message:'fail user id'})
    }
    const teachers = await userModel.find({material:subject}).select(' profile_pic name addFolowers')
    if(!teachers){
      return res.json({message:'fail material '})
    }
    let arr =[]
    for (const teacher of teachers) {
      const grades  =await gradesModel.find({createdby:teacher._id,grades:user.the_grades})


       for (const grade of grades) {
var exam =await examModel.find({Grades:grade._id ,creatdUser:{ $nin:user._id }})
// if (exam.length) {
// arr.push({ teacher,exam})
//   }

  const the_grades =await degreenModel.find({idexam:grade.exam ,UserId:user._id}).populate([
    {
            path:'idexam',
            select:'subject_Name  time exam_Name question  creatdUser kindOf_questions createdby' 
          }
    ])
    arr.push({ teacher, exam,the_grades})


       }

//        for (const grade2 of grades) {
// const the_grades =await degreenModel.find({idexam:grade2.exam ,UserId:user._id}).populate([
// {
//         path:'idexam',
//         select:'subject_Name  time exam_Name question  creatdUser kindOf_questions createdby' 
//       }
// ])
// if (the_grades.length) {
// arr.push({ teacher,the_grades})
  
// }

//      }

    }






    return res.json({message:"Done",arr})
 
  } 
  catch (error) {
    console.log(error);
    return res.json({message:"fail catch"})
  }
} 





export const followTeacher =async(req,res)=>{
    try {
      const {idUser ,idTeacher}=req.body
      const user = await userModel.findOne({_id:idUser})
      if(!user){
        return res.json({message:'fail user id'})
      }
      const teacher = await userModel.findOne({_id:idTeacher})
      if(!teacher){
        return res.json({message:'fail teacher id'})
      }
      const follow = await userModel.findOneAndUpdate({_id:idTeacher , role:'Teacher'},{
        $addToSet:{
            follow:idUser
        }
      })
      if (!follow) {
        return res.json({message:'fail'})
      }
      res.json({message:"Done"})
  
      
    } catch (error) {
      console.log(error);
      return res.json({message:'fail catch'})
    }
  }

  export const getSubject =async(req,res)=>{
    try {
      const {idUser }=req.body
      const user = await userModel.findOne({_id:idUser})
      if(!user){
        return res.json({message:'fail user id'})
      }
      const nameSubjects = await gradesModel.find({grades:user.the_grades}).select('subject_Name')
      if(!nameSubjects){
        return res.json({message:'fail name Subjects'})
      }
   res.json({message:'Done', nameSubjects})
      
    } catch (error) {
      console.log(error);
      return res.json({message:'fail catch'})
    }
  }


  
  export const theInvitation =async(req,res)=>{
    try {
      const {iduser ,idExam ,IdToUser}=req.body
      const User = await userModel.findOne({_id:IdToUser})
      if(!User){
        return res.json({message:'fail To user id'})
      }
      const user = await userModel.findOne({_id:iduser ,the_grades:User.the_grades ,school:User.school})
      if(!user){
        return res.json({message:'fail user id'})
      }

      const exam =await examModel.findOne({_id:idExam}).populate([{
        path :'createdby',
      }])
      // console.log(exam);
      if(!exam){
        return res.json({message:'fail exam id'})
      }
    const newInvitation = new InvitationModel({
      idexam:idExam,
      idUser:iduser,
      toUserId:IdToUser
    });
      if(!newInvitation){
        return res.json({message:"fail new Invitation"})
      }
 
      const date= await newInvitation.save();

      if (!date) {
        return res.json({message:'fail save'})
      }   
      res.json({message:"Done"})
    } catch (error) {
      console.log(error);
      return res.json({message:'fail catch'})
    }
  }
//$$
  export const getallInvitations =async(req,res)=>{
    try {
      const {idUser}=req.body
      const user = await userModel.findOne({_id:idUser})
      let data =[]
      if(!user){
        return res.json({message:'fail user id'})
      }
      const cursor = InvitationModel.find({idUser:idUser}).populate([{
        path:'toUserId',
        select:'name profile_pic the_grades'
      },{ path:'idUser',
      select:'name profile_pic the_grades'
    }
    ]).cursor()

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      // console.log(doc);
      const exam =await examModel.find({_id:doc.idexam}).populate([{
        path :'createdby',
        select:'name profile_pic material'
      }])
      // console.log(exam ,'ddd');
      data.push({doc,exam})
    }
      if(!cursor){
        return res.json({message:'fail Invitations'})
      }
      res.json({message:"Done", data })
    } catch (error) {
      console.log(error);
      return res.json({message:"fail catch"})
    }
  }



  export const theSchool =async(req,res)=>{
    try {
      const {nameSchool} =req.body
      const user = await userModel.find({school:nameSchool , role:'Student'}).select('name profile_pic the_grades')
      if(!user){
        return res.json({message:'fail user id'})
      }
      const teacher = await userModel.find({school:nameSchool , role:'Teacher'}).select('name profile_pic material')

      res.json({message:'Done' ,user ,  teacher})
    } catch (error) {
      console.log(error);
      return res.json({message:"fail catch"})
    }
  }


  export const schoolsToStudent  = async(req,res)=>{
    try {
      const user =await userModel.find({role:'Student'}).select('school')
      let data =[]
      for (let i = 0; i < user.length; i++) {
        var schools=user[i].school
        // console.log(schools);
        if (data.includes(schools)) {
          console.log('false');
        }else{
          const user =await userModel.find({role:'Student' ,school:schools}).select('name')

var users =user.length
data.push({schools ,users})

// console.log(schools ,Data);
        }
      // console.log({schools ,Data});
        
      }

      res.json({message:'Done',data})
      

    } catch (error) {
      console.log(error);
      return res.json({message:'fail catch'})
    }
  }


  export const thedegreeUsers =async(req,res)=>{
    try {
      const {idexam} =req.body
      const users =await userModel.find().select('name profile_pic')
      let data=[]
      for (const user of users) {
        const degreeExam =await degreenModel.find({UserId:user.id ,idexam:idexam}).populate([{
          path:"idexam",
        }])
        // console.log(degreeExam.length);
        if (degreeExam.length > 0) {
          data.push({user ,degreeExam})

        }
      }
      res.json({message:'Done' , data})
    } catch (error) {
      console.log(error);
      return res.json({message:'fail catch'})
    }
  }


  export const profileUser =async(req,res)=>{
    try {
      const {isUser ,idParent}=req.body
  let exams =[]
      const User = await userModel.findOne({_id:isUser ,role:'Student'}).select('name profile_pic the_grades')
      if(!User){
        return res.json({message:'fail To user id'})
      }
      const cursor = degreenModel.find({UserId:User._id}).populate([{
        path:'idexam',
      }]).cursor()


      

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
     const teacher =await userModel.find({_id:doc.idexam.createdby}).select('name profile_pic')
     exams.push({doc ,teacher})
    }
      if (req.body.idParent) {
        const parent =await userModel.findOne({_id:User._id ,followStudent:idParent})
        if(parent){
          return  res.json({message:"Done",User ,exams})
        }else{
          return   res.json({message:"Fail id Parent"})
        }
      }

    res.json({message:"Done",User ,exams})
    } catch (error) {
      console.log(error);
      return res.json({message:'fail catch'})
    }
  }


  // عرض كل المدرسين في نفس الصف
export const getallTeacherOfTheGrades =async(req,res)=>{
  try {
    const {idUesr}=req.body
    const user =await userModel.findOne({_id:idUesr ,role:'Student'})
    if(!user){
      return res.json({message:'fail user id'})
    }
    const teachers =await gradesModel.find({grades:user.the_grades}).select('createdby')
    console.log(teachers);
    let  data =[]
    for (const teacher of teachers) {
      const TheTeachers =await userModel.find({_id:teacher.createdby ,role:'Teacher' ,school:user.school}).select("name profile_pic material")
    data.push(TheTeachers)
    }
    res.json({message:'Done', data})

  } catch (error) {
    console.log(error);
    return res.json({message:'Fail catch'})
  }
}

// عرض المدرسين الي متبعهم
  export const UsersOfTeacher =async(req,res)=>{
    try {
      const {idUesr}=req.body
      const user =await userModel.findOne({_id:idUesr ,role:'Student'})
      if(!user){
        return res.json({message:'fail user id'})
      }
      const getallTeacher =await userModel.find({follow:user._id ,role:'Teacher'}).select('name school material profile_pic')
      res.json({message:'Done', getallTeacher})
    } catch (error) {
      console.log(error);
      return res.json({message:'fail catch'})
    }
  }