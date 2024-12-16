// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const postSchema = new Schema(
  {
    title:String,
    nameSubject:String,
       createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    comments:{
        type:Schema.Types.ObjectId,
        ref:'coment'
    },
  },
  {
    timestamps: true,
  }
);




const postModel = model("post", postSchema);

export default postModel;
