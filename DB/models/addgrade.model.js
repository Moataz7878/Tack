// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const gradeSchema = new Schema(
  {
namegrade:String,

  },
  {
    timestamps: true,
  }
);




const gradeModel = model("addgrade", gradeSchema);

export default gradeModel;
