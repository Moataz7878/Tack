import { model, Schema, Types } from "mongoose";
const gradeVideoSchema = new Schema( {

    gradeName:{
    type:String,
    require:true
    },
    title :String ,
    createdby:{
      type:Schema.Types.ObjectId,
          ref:'User',
          require:true
    },
    price:{
        type:Number,
        require:true
    },

    videoId:[
        {
            type:Schema.Types.ObjectId,
            ref:'video'
        }
    ],
    StudentId:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],

  },
  {
    timestamps: true,
  }
);

const gradeVideoModel = model("gradeVideo", gradeVideoSchema);

export default gradeVideoModel;
