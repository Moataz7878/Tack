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
    const governorate= ['Giza','Cairo','Alexandria','Aswan']
    return res.json({message:"Done", governorate})
  } catch (error) {
    return res.json({message:'Fail'})
  }
}

export const school =async(req,res,next)=>{
  try {
    const {governorate}=req.body
    if (governorate == "Giza") {
      const school =["Leading Egyption Language","Winners Language","Heritage International"]
    return res.json({message:"Done", school})
    }
    if (governorate == "Cairo") {
      const school =["El Araby School","Imam Muhammad Metwally Al-Shaarawy",
    "production School of Applied" ,"Martyr Captain"]
    return res.json({message:"Done", school})
    }
    if (governorate == "Alexandria") {
      const school =["Industrial","Kafy Ashry professional","Ambrose professional Girls"]
    return res.json({message:"Done", school})
    }
    if (governorate == "Aswan") {
      const school =["Muhammad Hussein othman Preparatory","Friend Ship Division","Narth City Primary" ]
    return res.json({message:"Done", school})
    }
  } catch (error) {
    return res.json({message:'Fail'})
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
    return res.json({message:"Done", getallgrades})
  } catch (error) {
    return res.json({message:'Fail'})
  }
}


export const subjects =async(req,res)=>{
  try {
    const material= ["Arabic","Mathematics","Phtsics","Chemistry"]
    return res.json({message:"Done", material})
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