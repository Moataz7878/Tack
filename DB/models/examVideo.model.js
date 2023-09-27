import { model, Schema, Types } from "mongoose";
const examVideoSchema = new Schema( {
    //اسم الماده
  subject_Name:{
    type:String,
    require:true
    },
    time:{
        type:Number
      },
      exam_Name:{
        type:String
        },
        
        kindOf_questions:{
            type:String,
            require:true
            },
    // id الاستاذ
    TeacherId:[{
      type:Schema.Types.ObjectId,
          ref:'User',
          require:true
    }],

    questionId:[
        {
            type:Schema.Types.ObjectId,
            ref:'questionVideo'
        }
    ],

    VideoId:[
      {
          type:Schema.Types.ObjectId,
          ref:'video'
      }
  ],

  StudentId:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  },{
    type:String
  }],

  },
  {
    timestamps: true,
  }
);

const examVideoModel = model("examVideo", examVideoSchema);

export default examVideoModel;