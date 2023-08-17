import gradeModel from "../../DB/models/addgrade.model.js";
import schoolModel from "../../DB/models/scholl.model.js";
import subjectModel from "../../DB/models/subject.model.js";
import userModel from "../../DB/models/user.model.js"
import clodinary from "../utils/clodinary.js";
import { compareFunction } from "../utils/hashFunction.js";
import { nanoid } from "nanoid";

//[]
//[]
//sinUp
export const signUp = async(req,res)=>{
try {
    const {name,the_grades,phone,school,material,governorate,Area,confirm_Password,email,password ,role ,img}=req.body
    if(!(password == confirm_Password)){
      return res.json({message:'password no ecole confrim password'})
    }
      
    const emailExist =await userModel.findOne({email})
    if (emailExist) {
        return  res.json({message:'email already exist'});
    }

    if (!(role=='Admin' || role=='Student' || role=='Teacher' || role=='Parent')) {
      return res.json({message:'roles  Student , Teacher , Parent'})
    }
    const cusmId=nanoid(5)
    if (!req.file) {
      const newUser = new userModel({
        name,
        the_grades,
        school,
        governorate,
        Area,
        confirm_Password,
        email,
        password,
        role,
        material,
        phone,
        
      });
        if(!newUser){
          return res.json({message:"fail newUser"})
        }
   
        
     const date= await newUser.save();
  
        if (!date) {
          return res.json({message:'fail save'})
        }   
     return   res.json({message:"Done signUp" ,date});
  
    }
    const {secure_url,public_id} =await clodinary.uploader.upload(req.file.path ,{folder:`user/${email}/profilePic/${cusmId}`})

const newUser = new userModel({
      name,
      the_grades,
      school,
      governorate,
      Area,
      confirm_Password,
      email,
      password,
      role,
      material,
      phone,
      profile_pic:secure_url,
      public_id
    });
      if(!newUser){
        return res.json({message:"fail newUser"})
      }
 
      
   const date= await newUser.save();

      if (!date) {
        return res.json({message:'fail save'})
      }   
      res.json({message:"Done signUp" ,date});

} catch (error) {
  //  res.json({message:"fail catch"})
    console.log(error);
}


}

//login user
export const login =async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.json({message:"fail userExist"})
    }

    const match = compareFunction({
      payload: password,
      referenceData: userExist.password
    });
    if (!match) {
      return res.json({message:'fail password'})
    }
    await userModel.findOneAndUpdate({email},{
      isLoggedIn:true
    },{
      new:true
    })
    res.json({message:'Done' ,userExist})
  
  } catch (error) {
    console.log(error);
    res.json({message:"fail catch"})
  }
 
};

//log out
export const logOut = async (req, res, next) => {
  const { id } = req.body;
  const user = await userModel.findByIdAndUpdate({_id:id}, {
    isLoggedIn: false,
  });
  if (user) {
    return res.json({ message: "Done" });
  }else{
    res.json({message:"Unknown Error"})
  }
  
};


export const governorates =async(req,res,next)=>{
  try {
    const governorate= ['Giza','Cairo','Alexandria','Aswan' ,'Shubra El-Kheima','Port Said',
  'Suez','Luxor','al-Mansura','El-Mahalla El-Kubra','Tanta','Asyut','Ismailia','Fayyum0',
'Zagazig','Damietta','Damanhur','al-Minya','Beni Suef','Qena','Sohag','Hurghada','Banha',
'Kafr el-Sheikh','Arish','Marsa Matruh']
    return res.json({message:"Done", governorate})
  } catch (error) {
    return res.json({message:'Fail'})
  }
}

export const school =async(req,res,next)=>{
  try {
    const {governorate}=req.body
    let schools=[]
    const school=await schoolModel.find({namegovernorate:governorate})
    for (let i = 0; i < school.length; i++) {
      const theSchool = school[i].nameSchool;
      schools.push(theSchool)
      
    }

    res.json({message:'Done',schools})
  } catch (error) {
    return res.json({message:'Fail'})
  }
}
export const addSchool =async(req,res)=>{
  try {
    const {nameSchool ,namegovernorate}=req.body
    const newSchool =new schoolModel({
      nameSchool :  nameSchool,
      namegovernorate   :    namegovernorate
    })
    const school =await newSchool.save()
    res.json({message:'Done' ,school})
  } catch (error) {
    return res.json({message:'Fail catch'})
    
  }
}

export const grades =async(req,res)=>{
  try {
    const getallgrades= [ "The First  grade of primary school"
      ,"The second grade of primary school",
      "The third grade of primary school",
      "The Fourth grade of primary school",
     " The Fifth grade of primary school",
     "The Sixth grade of primary school",
     "The First grade of Preparatory School","The second grade of Preparatory School","The third grade of Preparatory School",
    "The First grade secondary","The second secondary grade","The Third grade secondary"]
    const grades=await gradeModel.find()
    for (let i = 0; i < grades.length; i++) {
      const element = grades[i].namegrade
      getallgrades.push(element)
    }
    return res.json({message:"Done", getallgrades})
  } catch (error) {
    return res.json({message:'Fail'})
  }
}
export const addgrade =async(req,res)=>{
  try {
    const {namegrade}=req.body
    const newgrade =new gradeModel({
      namegrade:namegrade
    })
    const grade =await newgrade.save()
    res.json({message:'Done' ,grade})
  } catch (error) {
    return res.json({message:'Fail catch'})
    
  }
}


export const subjects =async(req,res)=>{
  try {
    const material= ["Arabic","Mathematics","Phtsics"]
    const subjects=await subjectModel.find()
    for (let i = 0; i < subjects.length; i++) {
      const element = subjects[i].subject.toString();
      material.push(element)
    }
    return res.json({message:"Done", material})
  } catch (error) {
    return res.json({message:'Fail'})
  }
}
export const addsubjects =async(req,res)=>{
  try {
 const {nameSubject}=req.body
 const newsubject=new subjectModel({
  subject:nameSubject
 })
 const subject= await newsubject.save()

    return res.json({message:"Done", subject})
  } catch (error) {
    return res.json({message:'Fail'})
  }
}



//First grade of Preparatory School



export const GetallUser =async(req,res)=>{
  try {
    const {idUser} =req.body
    const user =await userModel.findOne({_id:idUser})
    if (!user) {
        return res.json({message:"fail idUser"})
    }
    const getallUser =await userModel.find({the_grades:user.the_grades ,school:user.school ,role:"Student"}).select(' profile_pic name ')
    res.json({message:"Done",getallUser})
  } catch (error) {
    console.log(error);
    return res.json({message:"fail catch"})
  }
}




export const GetallTeahersconfrim =async(req,res)=>{
  try {
    const {idTeacher} =req.body
    const user =await userModel.find({_id:idTeacher ,role:"Teacher" ,isLoggeConfim:false})
    if (!user) {
        return res.json({message:"fail idUser"})
    }
    const getallUser =await userModel.find({the_grades:user.the_grades ,school:user.school ,role:"Student"}).select(' profile_pic name ')
    res.json({message:"Done",getallUser})
  } catch (error) {
    console.log(error);
    return res.json({message:"fail catch"})
  }
}






//عربي - رياضيات – فيزياء – كيمياء) 