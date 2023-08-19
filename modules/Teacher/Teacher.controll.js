import orderModel from "../../DB/models/Teacher_order.model.js";
import adviceModel from "../../DB/models/advice.model.js";
import cashModel from "../../DB/models/cash_Withdrawal.js";
import examModel from "../../DB/models/exam.model.js";
import degreenModel from "../../DB/models/examDegree.model.js";
import gradesModel from "../../DB/models/grades.model.js";
import questionModel from "../../DB/models/question.model.js";
import userModel from "../../DB/models/user.model.js";
import clodinary from "../utils/clodinary.js";
import { nanoid } from "nanoid";


export  const addgrades =async(req,res)=>{
  try {
    const {grades,subject_Name,createdby}=req.body
    const Teacher =await userModel.findOne({_id:createdby ,role:"Teacher" ,confirmTeachers:true})
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
        
    const newgrades = new gradesModel({
      grades,
      subject_Name:Teacher.material
      ,createdby
    });
      if(!newgrades){
        return res.json({message:"fail newUser"})
      }
      const date= await newgrades.save();

      if (!date) {
        return res.json({message:'fail save'})
      } 
      res.json({message:"Done",date})
  } catch (error) {
    return  res.json({message:"Fail catch"});
  }
}

export const addexam =async(req,res)=>{
  try {
    const {subject_Name,time,exam_Name,kindOf_questions,createdby ,Idgrades}=req.body
    const Teacher =await userModel.findOne({_id:createdby ,role:"Teacher"})
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
    const newexam = new examModel({
      subject_Name:Teacher.material,
time,
exam_Name,
kindOf_questions,
createdby
      
    });
      if(!newexam){
        return res.json({message:"fail newexam"})
      }
      const date= await newexam.save();
      if (!date) {
        return res.json({message:'fail save'})
      } 

      await examModel.findOneAndUpdate({_id:newexam._id},{
        $push:{
          Grades:Idgrades
        }
      },{
        new:true
      })
 const grades =  await gradesModel.findOneAndUpdate({_id:Idgrades},{
        $push:{
          exam:date._id
        }},{
          new:true
        })
        if (!grades) {
          return res.json({message:"fail2 "})
        }
      res.json({message:"Done",date})
  } catch (error) {
   return res.json({message:"Fail catch"})
  }
}

export const deleteExam =async(req,res)=>{
  try {
   const {idexam}=req.body
   const delet =await examModel.findOneAndDelete({_id:idexam})
   if(!delet){
    return res.json({message:"fail  Delete"})
 }
   res.json({message:"Done"})
  } catch (error) {
   return res.json({message:'fail error'})
  }
   }

export const updateExam=async(req,res)=>{
  try {
    const {IdExam ,time ,exam_Name ,kindOf_questions} =req.body
    const exam =await examModel.findOne({_id:IdExam})
    if (!exam) {
        return res.json({message:'please enter exam id'})
    }
    if (req.body.time) {
      exam.time =req.body.time
    }
    if (req.body.exam_Name) {
      exam.exam_Name =req.body.exam_Name
    }
    if (req.body.kindOf_questions) {
      exam.kindOf_questions =req.body.kindOf_questions
    }
   
    const saveExam =await exam.save()
    if (!saveExam) {
        return res.json({message:'fail save'})
    }
    res.json({message:'Done',saveExam})
  } catch (error) {
    return res.json({message:"fail catch"})
  }

}


export const addQuestion =async(req,res)=>{
  try {
    const {Idexam,test_node,img ,createdby,question,correct_Answer,choose2,choose3,choose4}=req.body
    const Teacher =await userModel.findOne({_id:createdby ,role:"Teacher"})
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
    if (!req.file) {
      const newQuestion = new questionModel({
        test_node,
        question,
        correct_Answer,
  createdby,
  choose2,
  choose3,
  choose4 
      });
      if(!newQuestion){
        return res.json({message:"fail newQuestion"})
      }
      const date= await newQuestion.save();
      if (!date) {
        return res.json({message:'fail save'})
      } 
      const Question =  await examModel.findOneAndUpdate({_id:Idexam},{
        $push:{
          question:date._id
        }},{
          new:true
        })
        if (!Question) {
          return res.json({message:"fail Idexam"})
        }
        await questionModel.findOneAndUpdate({_id:date._id},{
          $push:{
            exam:Idexam
          }},{
            new:true
          })
          return  res.json({message:"Done",date})

    }
    const cusmId=nanoid(5)

    const {secure_url,public_id} =await clodinary.uploader.upload(req.file.path ,{folder:`Question/profilePic/${cusmId}`})

    const newQuestion = new questionModel({
      test_node,
      question,
      correct_Answer,
createdby,
choose2,
choose3,
choose4 ,
profile_pic:secure_url,
public_id
  
    });
    if(!newQuestion){
      return res.json({message:"fail newQuestion"})
    }
    const date= await newQuestion.save();
    if (!date) {
      return res.json({message:'fail save'})
    } 
    const Question =  await examModel.findOneAndUpdate({_id:Idexam},{
      $push:{
        question:date._id
      }},{
        new:true
      })
      if (!Question) {
        return res.json({message:"fail3 "})
      }
      await questionModel.findOneAndUpdate({_id:date._id},{
        $push:{
          exam:Idexam
        }},{
          new:true
        })
            return  res.json({message:"Done",date})
  } catch (error) {
    return res.json({message:"fail catch"})
  }
}

export const deleteQuestion =async(req,res)=>{
  try {
   const {Question}=req.body
   const delet =await questionModel.findOneAndDelete({_id:Question})
   if(!delet){
    return res.json({message:"fail  Delete"})
 }
   res.json({message:"Done"})
  } catch (error) {
   return res.json({message:'fail error'})
  }
   }

   export const updateQuestion=async(req,res)=>{
    try {
      const {IdQuestion ,question ,test_node ,correct_Answer,choose3,
        choose2,choose4  ,img} =req.body
      const Question =await questionModel.findOne({_id:IdQuestion})
      if (!Question) {
          return res.json({message:'please enter Question id'})
      }
      if (req.body.question) {
        Question.question =req.body.question
      }
      if (req.body.test_node) {
        Question.test_node =req.body.test_node
      }
      if (req.body.correct_Answer) {
        Question.correct_Answer =req.body.correct_Answer
      }
  
      if (req.body.choose2) {
        Question.choose2 =req.body.choose2
      }
     
      if (req.body.choose3) {
        Question.choose3 =req.body.choose3
      }
     
      if (req.body.choose4) {
        Question.choose4 =req.body.choose4
      }
      if (req.file) {
    const cusmId=nanoid(5)

        const {secure_url,public_id} =await clodinary.uploader.upload(req.file.path ,{folder:`Question/${Question._id}/profilePic/${cusmId}`})
     
                    Question.profile_pic =secure_url
                    Question.public_id=public_id
      }
     
      const saveQuestion =await Question.save()
      if (!saveQuestion) {
          return res.json({message:'fail save'})
      }
      res.json({message:'Done',saveQuestion})
    } catch (error) {
      return res.json({message:"fail catch"})
    }
  
  }
  


  export const addFolower =async(req,res)=>{
    try {
      const {idTeacher , addFolowers} =req.body
      const Teacher =await userModel.findOne({_id:idTeacher ,role:"Teacher"})
      if (!Teacher) {
        return res.json({message:"fail id Teacher"})
      }
      Teacher.confirm =req.body.addFolowers
      const data =await Teacher.save()
      if (!data) {
        return res.json({message:"fail"})
      }
      res.json({message:"Done"})
    } catch (error) {
      return res.json({message:"fail catch"})
    }
  }

  export const getallTeacherAddFolowers =async(req,res)=>{
    try {
      const teachers =await userModel.find({confirm: { $gte:1} , role:'Teacher'}).select('name material  profile_pic confirm')
      if (!teachers) {
      res.json({message:"fail" })

      }
      res.json({message:"Done",teachers })
    } catch (error) {
      return res.json({message:"fail catch"})
    }
  }

  export const addconfirm =async(req,res)=>{
    try {
      const {idTeacher , text}= req.body
      const Teacher =await userModel.findOne({_id:idTeacher ,role:"Teacher"})
      if (!Teacher) {
        return res.json({message:"fail id Teacher"})
      }
      if (!(text == "confirm" || text == "decline") ) {
        return res.json({message:"please enter confirm  decline"})
      }
      if (text == "confirm") {
        const x =   Teacher.addFolowers + Teacher.confirm
        Teacher.addFolowers =x
        Teacher.confirm = 0
        await Teacher.save()
        return res.json({message:"Done confirm"})
      }
      if (text == "decline") {
        Teacher.confirm = 0
        await Teacher.save()
        return res.json({message:"Done decline"})
      }
    } catch (error) {
      return res.json({message:"fail catch"})
    }
  }


  export const getallTeacherPage=async(req,res)=>{
    try {
      const {idTeacher }=req.body
      // const user =await userModel.findOne({_id:idUser ,role:"Student"})
      // if (!user) {
      //   return res.json({message:"fail id user"})
      // }
      const Teacher =await userModel.findOne({_id:idTeacher ,role:"Teacher"})
      if (!Teacher) {
        return res.json({message:"fail id Teacher"})
      }
      const thegrades =await gradesModel.find({createdby:Teacher._id})
      .populate([
        {
          path:'exam'
            // select:"name profile_pic"
        }
      ])
      if (!thegrades) {
        return res.json({message:"fail id thegrades"})
      }
  
      res.json({message:"Done5555",Teacher,thegrades})
    } catch (error) {
      return res.json({message:"fail catch"})
    }
  }





export const getallTeacherofStudent=async(req,res)=>{
  try {
        const {idTeacher ,idUser}=req.body
        let data =[]
        const user =await userModel.findOne({_id:idUser})
        if (!user) {
          return res.json({message:"fail id user"})
        }
        const Teacher =await userModel.findOne({_id:idTeacher ,role:"Teacher"})
        if (!Teacher) {
          return res.json({message:"fail id Teacher"})
        }
        const thegrades =await gradesModel.find({createdby:Teacher._id , grades:user.the_grades})
        if (!thegrades) {
          return res.json({message:"fail id thegrades"})
        }
     for (const grades of thegrades) {
      const exam =await examModel.find({_id:grades.exam , creatdUser:{ $nin:user._id }})
      // console.log(exam);
      const degreen =await degreenModel.find({idexam:grades.exam ,UserId:user._id}).populate([
        {
                path:'idexam',
                select:'subject_Name  time exam_Name question  creatdUser kindOf_questions createdby' 
              }
        ])
    data.push({exam,degreen})
     }
    
        res.json({message:"Done",Teacher,data})
     }   catch (error) {
    console.log(error);
    return res.json({message:"fail catch"})
  }
}







export const getallexam =async(req,res)=>{
  try {
    const {Idexam}=req.body
    const getexam =await examModel.find({_id:Idexam}).populate([
          {
            path:'question'
          },{
            path:'createdby',
            select:'name material profile_pic'
          }
        ])
    if(!getexam){
      return res.json({message:"fail Id exam "})
    }
    res.json({message:"Done",getexam})
  } catch (error) {
    console.log(error);
    return res.json({message:"fail catch"})
  }
}


export const getallexamsofgrades =async(req,res)=>{
  try {
    const {idTeacher ,idgrades} =req.body
    let data =[]
    const Teacher =await userModel.findOne({_id:idTeacher ,role:"Teacher"}).select(' material profile_pic name')
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
    const getexams =await examModel.find({Grades:idgrades ,createdby:idTeacher})
    if(!getexams){
      return res.json({message:"fail Id exam "})
    }
    data.push({Teacher,getexams})

    res.json({message:"Done",data})

  } catch (error) {
    console.log(error);
    return res.json({message:"fail catch"})
  }
}


export const getallReceivablesPage =async(req,res)=>{
  try {
    const {idTeacher} =req.body
    let data =[]
    let all =[]
    const Teacher =await userModel.findOne({_id:idTeacher ,role:"Teacher"}).select('follow material profile_pic  name addFolowers aitashab Equation')
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
    const ReceivablesPage =await examModel.find({createdby:idTeacher}).select('creatdUser')
    if(!ReceivablesPage){
      return res.json({message:"fail Id exam "})
    }
    for (let i = 0; i < ReceivablesPage.length; i++) {
      const element = ReceivablesPage[i].creatdUser ;
      const x= element.length
      all.push(x)

      
    }
      console.log(all);

//  عدد المشاهدات
      let result = all.reduce((sum, current) => sum + current);
      
console.log(result);
console.log(Teacher.aitashab);
console.log(Teacher.addFolowers);

const equation = result * 1 - Teacher.aitashab - Teacher.addFolowers

 console.log("equation" , equation);
await userModel.findOneAndUpdate({_id:Teacher._id},{
  Equation:equation
},{
  new :true
})

    data.push({Teacher,result,equation})

  
    res.json({message:"Done",data})

   
  } catch (error) {
    console.log(error);
    return res.json({message:"fail catch"})
  }
}


export const getallTeacherofgrades =async(req,res)=>{
  try {
    const {idTeacher } =req.body
    let data =[]
    const Teacher =await userModel.findOne({_id:idTeacher ,role:"Teacher"}).select(' material profile_pic name')
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
    const getgrads =await gradesModel.find({createdby:idTeacher})
    if(!getgrads){
      return res.json({message:"fail Id exam "})
    }
    data.push({Teacher,getgrads})

    res.json({message:"Done",data})

  } catch (error) {
    console.log(error);
    return res.json({message:"fail catch"})
  }
}







export const cash_Withdrawal =async(req,res)=>{
  try {
    const {idTeacher , amount ,phone} =req.body
    const Teacher =await userModel.findOne({_id:idTeacher})
    // console.log(Teacher);
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
    if (Teacher.Equation > amount || Teacher.Equation == amount) {
      const newOrder =new cashModel({
        phone,
        amount,
        idTeacher
      })
      if (!newOrder) {
        return res.json({message:"fail 1 "})
      }
      const save = await newOrder.save()
      if (!save) {
        return res.json({message:"fail save "})
      }
      return res.json({message:"Done"})
    }
    res.json({message:"your balance value is not enough" ,your_balance:Teacher.Equation })
  } catch (error) {
    console.log(error);
    return res.json({message:'fail catch'})
  }
}


export  const getallOrder =async(req,res)=>{
try {
  const orders =await cashModel.find({confirmed:false}).populate([{
    path :'idTeacher',
    select :"name profile_pic",
  }])
if (!orders.length) {
  return res.json({message:'order no lenth'})
}
res.json({message:"Done",orders})
} catch (error) {
  console.log(error);
  return res.json({message:'fail catch'})
}
}

export const confirmOrder =async(req,res)=>{
  try {
    const {img , title , idOrder}=req.body
    const order =await cashModel.findById(idOrder)
    if(!order){
      return res.json({message:"Fail id order"})
    }
    // console.log(order.idTeacher);
    const Teacher = await userModel.findById(order.idTeacher)
    // console.log(Teacher.aitashab);
  const {secure_url,public_id} =await clodinary.uploader.upload(req.file.path ,{folder:`img/${Teacher._id}/${order._id}/profilePic`})

    const newOrder =new orderModel({
      title,
      idTeacher:order.idTeacher,
      idOrder:idOrder,
      profile_pic:secure_url,
      public_id
    })
    if (!newOrder) {
      return res.json({message:"fail "})
    }
    const save =await newOrder.save()
    ///===========
    if (!save) {
      return res.json({message:"fail save "})
    }
  const news  =order.amount +Teacher.aitashab
  Teacher.aitashab = news
    await Teacher.save()
    // console.log(Teacher.aitashab);

              await cashModel.findOneAndUpdate({_id:order._id},{
                confirmed : true
              },{
                new:true
              })
res.json({message:"Done",save})

  } catch (error) {
    console.log(error);
    return res.json({message:'fail catch'})
  }
}


export const TeacherOrders =async(req,res)=>{
  try {
    const {idTeacher}=req.body
    const Teacher =await userModel.findOne({_id:idTeacher})
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
    const orders =await cashModel.find({idTeacher:Teacher._id})
    if (!orders.length) {
      return res.json({message:'order no lenth'})
    }
res.json({message:"Done",orders})

  } catch (error) {
    console.log(error);
    return res.json({message:'fail catch'})
  }
}



export const TeacherOrdersMessage =async(req,res)=>{
  try {
    const {idTeacher , idOrder}=req.body
    const Teacher =await userModel.findOne({_id:idTeacher})
    if (!Teacher) {
      return res.json({message:"fail id Teacher"})
    }
    const order =await cashModel.findOne({_id:idOrder ,confirmed:true})
    if (!order) {
      return res.json({message:"fail id order and confirmed"})
    }
    const orders =await orderModel.findOne({idOrder ,idTeacher})
    if (!orders) {
      return res.json({message:"fail"})
    }
    res.json({message:"Done",orders })
  } catch (error) {
    console.log(error);
    return res.json({message:'fail catch'})
  }
}







export  const getallconfirmTeacher =async(req,res)=>{
  try {
    const teachers =await userModel.find({confirmTeachers:false ,role:"Teacher"})
  if (!teachers.length) {
    return res.json({message:'teachers no lenth'})
  }

  res.json({message:"Done",teachers})
  } catch (error) {
    console.log(error);
    return res.json({message:'fail catch'})
  }
  }



  export const addconfirmTeacher =async(req,res)=>{
    try {
      const {idTeacher , message}= req.body
      const Teacher =await userModel.findOne({ _id:idTeacher ,role:"Teacher" ,confirmTeachers:false})
      if (!Teacher) {
        return res.json({message:"fail  Teacher"})
      }
      if (message == "confirm") {
        await userModel.findOneAndUpdate({_id:idTeacher},{
          confirmTeachers:true
        })
        return res.json({message:"Done confirm"})
      }
      
      return res.json({message:"fail confirm"})
      

    } catch (error) {
      return res.json({message:"fail catch"})
    }
  }

  export const addAdvice =async(req,res)=>{
    try {
      const {body ,title ,to}=req.body

      if (!(to=='Student' || to=='Teacher' || to=='Parent')) {
        return res.json({message:'please enter  Student , Teacher , Parent'})
      }

      const newAdvice =new adviceModel({
        body,
        title,
        to
      })
      const advice =await newAdvice.save()
      return res.json({message:'Done',advice})
    } catch (error) {
      console.log(error);
      return res.json({message:'fail catch'})
    }
  }

  export const getallAdvices =async(req,res)=>{
try {
  const {id} =req.body
  const user =await userModel.findOne({_id:id})
  if (!user) {
    return res.json({message:'fail id'})
  }
  const advices =await adviceModel.find({to:user.role})
  if (!advices.length) {
    return res.json({message:'there is no'})
  }
  return res.json({message:'Done',advices})
} catch (error) {
  console.log(error);
  return res.json({message:'fail catch'})
}
  }





