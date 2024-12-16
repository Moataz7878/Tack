// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const schoolSchema = new Schema(
  {
nameSchool:String,
namegovernorate:String
  },
  {
    timestamps: true,
  }
);




const schoolModel = model("school", schoolSchema);

export default schoolModel;
