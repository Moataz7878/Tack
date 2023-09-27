// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const cashVideoTeacherSchema = new Schema(
  {
    price:Number,
   title:String,
    idTeacher:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    idUser:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    idgrades:{
        type:Schema.Types.ObjectId,
        ref:'gradeVideo',
        require:true
      },
      profile_pic: String,
  
      public_id: String,
    confirmed: {
        type: Boolean,
        default: false,
      }
  },{
    timestamps: true,
  }
);

const cashVideoModel = model("cashVideo", cashVideoTeacherSchema);

export default cashVideoModel;
