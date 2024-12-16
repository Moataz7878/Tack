// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const subjectSchema = new Schema(
  {
subject:[
    String
]
  },
  {
    timestamps: true,
  }
);

const subjectModel = model("subject", subjectSchema);

export default subjectModel;
