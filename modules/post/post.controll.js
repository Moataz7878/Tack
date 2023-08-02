import comentModel from "../../DB/models/comment.model.js";
import gradesModel from "../../DB/models/grades.model.js";
import postModel from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";

export const addPosts = async (req, res, next) => {
try {
  const { title, createdBy ,nameSubject} = req.body;
  const user =await userModel.findOne({_id:createdBy})
  if (!user) {
      return res.json({message:"fail user id"})
  }
  // const userpost =await postModel.findOne({createdBy})
  // if (userpost) {
  //     return res.json({message:"fail id orade exiet"})
  // }
  const post = new postModel({
    title,
    createdBy,
    nameSubject
  });
  if(!post){
    return res.json({message:"fail post"})
  }
  const savepost = await post.save();
  if (!savepost) {
      return res.json({message:"fail save"})
  }
  res.json({message:"Done",savepost})

} catch (error) {
   return res.json({message:"fail catch"})
}
    
  };

 export const deletePost =async(req,res)=>{
   try {
    const {createdBy , id}=req.body
    const postDelete =await postModel.findOneAndDelete({_id:id ,createdBy:createdBy})
    if(!postDelete){
       return res.json({message:"fail id Delete"})
    }
    
    res.json({message:"Done"})
   } catch (error) {
    return res.json({message:'fail error'})
   }
    }


//get all post (home page)
export const getllAllPost =async(req,res)=>{
try {
  const {id , nameSubject}=req.body
  const user =await userModel.findOne({_id:id})
  if (!user) {
      return res.json({message:"fail user id"})
  }
  const posts =await postModel.find({nameSubject:nameSubject}).populate([{
    path:'createdBy',
    select:"name profile_pic the_grades school  role "
  }])
  if(!posts){
    return res.json({message:"fail product"})
  }
  let  arr=[]
  for (let i = 0; i < posts.length; i++) {
    const element = posts[i];
    const theUser =await userModel.find({the_grades:element.createdBy.the_grades , school:element.createdBy.school})
  
    if (user.role == 'Teacher') {
      const teacher =await gradesModel.find({createdby:id}).select('grades')
      for (let i = 0; i < teacher.length; i++) {
        const elements = teacher[i];
    
        if (element.createdBy.the_grades ==elements.grades  ){
          var poost =await postModel.find({_id:element._id ,nameSubject:nameSubject}).populate([{
            path:'createdBy',
            select:"name profile_pic"
          }])
          arr.push(poost)
        }
      }
    }
    if (user.role == 'Student'){
      if (element.createdBy.the_grades ==user.the_grades ) {
 
        var poost =await postModel.find({_id:element._id ,nameSubject:nameSubject}).populate([{
          path:'createdBy',
          select:"name profile_pic"
        }])
        arr.push(poost)
      }
    }
   
  }

  res.json({message:"Done",arr})
} catch (error) {
  return res.json({message:"fail catch"})
}
}


