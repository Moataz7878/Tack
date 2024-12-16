import { model, Schema } from "mongoose";
const degreeExamVideoSchema = new Schema(
  {
    degree:{
        type :Number,
        default:0
    },
  UserId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true

    },
  idexam: {
        type:Schema.Types.ObjectId,
        ref:'examVideo',
        require:true
},
  idVideo: {
        type:Schema.Types.ObjectId,
        ref:'video',
        require:true
}
  },
  {
    timestamps: true,
  }
);
const degreeExamVideoModel = model("degreeVideo", degreeExamVideoSchema);
export default degreeExamVideoModel;
