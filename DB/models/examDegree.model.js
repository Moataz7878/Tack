import { model, Schema } from "mongoose";
const degreeSchema = new Schema(
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
        ref:'exam',
        require:true
}
  },
  {
    timestamps: true,
  }
);
const degreenModel = model("degree", degreeSchema);
export default degreenModel;
