// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const orderSchema = new Schema(
  {
    title:String,
    profile_pic: String,
  
    public_id: String,
    idTeacher:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    idOrder:{
      type:Schema.Types.ObjectId,
        ref:'cash'
    }
  

  },
  {
    timestamps: true,
  }
);




const orderModel = model("order", orderSchema);

export default orderModel;
