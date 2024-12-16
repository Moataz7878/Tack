// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const comentSchema = new Schema(
  {
    commBody:{
        type:String,
        required:true
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
       postId:{
        type:Schema.Types.ObjectId,
        ref:'post'
    },
      likes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
  },
  {
    timestamps: true,
  }
);
const comentModel = model("coment", comentSchema);
export default comentModel;
