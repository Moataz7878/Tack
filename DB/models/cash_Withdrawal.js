// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const cashSchema = new Schema(
  {
    phone:Number,
    amount:Number,
    idTeacher:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    confirmed: {
        type: Boolean,
        default: false,
      }

  },
  {
    timestamps: true,
  }
);




const cashModel = model("cash", cashSchema);

export default cashModel;
