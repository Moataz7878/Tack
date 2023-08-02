import comentModel from "../../DB/models/comment.model.js";
import postModel from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";

//addcomment
export const addcomment =async(req,res)=>{
  try {
    const {commBody,postId,createdby}=req.body
    const user =await userModel.findOne({_id:createdby}).select('name profile_pic role')
    if(!user){
        return res.json({message:"fail user Id"});
    }
    const post =await postModel.findOne({_id:postId})
 if(!post){
     return res.json({message:"fail product Id"});
 }
 
 const commrnt =new comentModel({
    commBody,postId,createdby:user
 })
 if(!commrnt){
    return res.json({message:"fail commrnt"})
 }



    
 const commrntSave= await commrnt.save()
    await postModel.findOneAndUpdate({_id:postId},{
      $addToSet:{
        comments:commrnt
    }
  },{new:true})
 
 if(!commrntSave){
   return res.json({message:"fail commrnt save"})
 }
 res.json({message:"Done",commrntSave})
} catch (error) {
    return res.json({message:'fail catch'})
}
 }


export  const commentlike =async(req,res)=>{
   const {idUser ,idComment}=req.body
   const user =await userModel.findOne({_id:idUser})
    if(!user){
        return res.json({message:"fail user Id"});
    }
const addLikeComment =await comentModel.findOneAndUpdate({_id:idComment },{
  $addToSet:{
    likes:idUser
  }
},{
  new:true
})
if(!addLikeComment){
  return res.json({message:"fail like"})
}
await addLikeComment.save()

res.json({message:"Done",addLikeComment})

  }

  export const getallComment = async(req,res)=>{
    try {
      const {postId} =req.body
      const post =await postModel.findOne({_id:postId})
      if (!post) {
        return res.json({message:"id fail post"})
      }
      const getComment =await comentModel.find({postId:postId}).populate([{
        path:'createdby',
        select:"name profile_pic role "
      },{
        path:'likes',
        select:"name profile_pic role "

      }])
    res.json({message:'Done',getComment })
      
    } catch (error) {
      return res.json({message:'fail catch'})
    }
  }


  export const deletecomment =async(req,res)=>{
    try {
     const {createdBy , idcomment}=req.body
     const commentDelete =await comentModel.findOneAndDelete({_id:idcomment ,createdby:createdBy})
     if(!commentDelete){
        return res.json({message:"fail id Delete"})
     }
     
     res.json({message:"Done"})
    } catch (error) {
     return res.json({message:'fail error'})
    }
     }
