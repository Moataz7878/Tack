// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const videoSchema = new Schema(
  {
title:String,
profile_pic: String,
  
public_id: String,
time:String,
idexamVideo:[
    {
        type:Schema.Types.ObjectId,
        ref:'examVideo'
    }
],
TeacherId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    require:true
},
idgrades:{
  type:Schema.Types.ObjectId,
  ref:'gradeVideo',
  require:true
}
  },
  {
    timestamps: true,
  }
);


const videoModel = model("video", videoSchema);

export default videoModel;
