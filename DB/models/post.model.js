// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const postSchema = new Schema(
  {
    title:String,
    nameSubject:String,
    // likes:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // }],
    // Unlikes:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // }],
       createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    comments:{
        type:Schema.Types.ObjectId,
        ref:'coment'
    },
    // totilVotes:{
    //   type:Number
    // } 
  },
  {
    timestamps: true,
  }
);




const postModel = model("post", postSchema);

export default postModel;
