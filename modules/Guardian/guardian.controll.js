import userModel from "../../DB/models/user.model.js";



export const getallUserToGuardian =async(req,res)=>{
    try {
        const {idGuardian} =req.body
        const Guardian =await userModel.findOne({_id:idGuardian})
        if (!Guardian) {
            return res.json({message:"fail id Guardian"})
        }
        const users =await userModel.find({the_grades:Guardian.the_grades ,school:Guardian.school ,role:'Student'})
        if (!users) {
            return res.json({message:"fail  users"})
        }
        res.json({message:"Done",users})
    } catch (error) {
        return  res.json({message:"fail catch"});
    }
}



export const followStudent =async(req,res)=>{
    try {
      const {idStudent ,idGuardian}=req.body
      const user = await userModel.findOne({_id:idStudent ,role:'Student'})
      if(!user){
        return res.json({message:'fail Student id'})
      }
      const Guardian = await userModel.findOne({_id:idGuardian ,role:'Parent'})
      if(!Guardian){
        return res.json({message:'fail Guardian id'})
      }
      const follow = await userModel.findOneAndUpdate({_id:user._id},{
        $addToSet:{
            followStudent:Guardian._id
        }
      })
      if (!follow) {
        return res.json({message:'fail'})
      }
      res.json({message:"Done"})
  
      
    } catch (error) {
      return res.json({message:'fail catch'})
    }
  }


export const parentOfUsers =async(req,res)=>{
  try {
    const {idGuardian}=req.body
    const Guardian =await userModel.findOne({_id:idGuardian ,role:'Parent'})
    if(!Guardian){
      return res.json({message:'fail Guardian id'})
    }
    const users =await userModel.find({followStudent:idGuardian ,role:'Student'})
    res.json({message:'Done', users})
  } catch (error) {
    return res.json({message:'fail catch'})
  }
}